import { completion } from "litellm";

// https://developer.mozilla.org/docs/Web/API/ReadableStream#convert_async_iterator_to_stream
function iteratorToStream(iterator: any) {
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

function sleep(time: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

const encoder = new TextEncoder();

async function* makeIterator3() {
  const foo = await completion({
    model: "gpt-3.5-turbo",
    messages: [{ content: "Hello, how are you?", role: "user" }],
    stream: true,
  });

  for await (const chunk of foo) {
    const content = chunk.choices[0]?.delta?.content || "";
    console.log(chunk);
    yield encoder.encode(content);
  }
}

export async function GET() {
  // const iterator = makeIterator();

  // or stream the results

  const stream = iteratorToStream(makeIterator3());

  return new Response(stream);
}
