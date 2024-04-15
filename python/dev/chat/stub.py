import modal
from fastapi.responses import StreamingResponse
from litellm import completion
from litellm.utils import ModelResponse
from modal import Stub, web_endpoint

stub = Stub()

image = modal.Image.debian_slim(python_version="3.12").pip_install("litellm")


def fake_event_streamer():
    user_message = "Hello, how are you?"
    messages = [{"content": user_message, "role": "user"}]
    response = completion(model="gpt-3.5-turbo", messages=messages, stream=True)
    for part in response:
        if isinstance(part, ModelResponse):
            yield part.model_dump_json()


@stub.function(image=image, secrets=[modal.Secret.from_name("openai-api-key")])
@web_endpoint()
def stream_me():
    return StreamingResponse(fake_event_streamer(), media_type="text/event-stream")
