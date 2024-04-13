import OpenAI from "openai";
import { encoding_for_model } from "tiktoken";
import { LLM_MODEL_CONFIGS, type LLMModel } from "~/lib/ai/llms";

const openai = new OpenAI();

// https://developer.mozilla.org/docs/Web/API/ReadableStream#convert_async_iterator_to_stream
function iteratorToStream(iterator: AsyncGenerator<Uint8Array, void, unknown>) {
  return new ReadableStream({
    async pull(controller) {
      const { value, done } = await iterator.next();
      if (done) {
        controller.close();
      } else {
        controller.enqueue(value);
      }
    },
  });
}

const encoder = new TextEncoder();

export type LLMCompletionResponse = {
  content: string;
  inputTokens: number;
  inputCost: number;
  outputTokens: number;
  outputCost: number;
  chunk: boolean;
};

async function* openAIGenerator() {
  //
  const model: LLMModel = "gpt-3.5-turbo";
  const prompt = "Hello, how are you?";

  //
  const encoding = encoding_for_model(model);
  const inputCostPerToken = LLM_MODEL_CONFIGS[model].input_cost_per_token;
  const outputCostPerToken = LLM_MODEL_CONFIGS[model].output_cost_per_token;

  //
  const inputTokens = encoding.encode(prompt).length;
  const inputCost = inputTokens * inputCostPerToken;

  //
  const stream = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ content: prompt, role: "user" }],
    stream: true,
  });

  let text = "";
  for await (const chunk of stream) {
    const content = chunk.choices[0]?.delta?.content ?? "";
    if (!content) continue;
    const outputTokens = encoding.encode(content).length;
    const response: LLMCompletionResponse = {
      content,
      inputTokens,
      inputCost,
      outputTokens,
      outputCost: outputTokens * outputCostPerToken,
      chunk: true,
    };
    text += content;
    yield encoder.encode(JSON.stringify(response));
  }

  const totalTokens = encoding.encode(text).length;
  const overallResponse: LLMCompletionResponse = {
    content: text,
    inputTokens,
    inputCost,
    outputTokens: totalTokens,
    outputCost: totalTokens * outputCostPerToken,
    chunk: false,
  };
  yield encoder.encode(JSON.stringify(overallResponse));
}

export async function GET() {
  const stream = iteratorToStream(openAIGenerator());
  return new Response(stream);
}
