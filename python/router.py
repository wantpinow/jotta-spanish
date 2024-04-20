import os
from enum import Enum

import modal
from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from litellm import completion
from modal import Image
from pydantic import BaseModel

# initialize the stub
stub = modal.Stub("router")


# initialize the FastAPI app (with Bearer token authentication)
async def verify_token(token: HTTPAuthorizationCredentials = Depends(HTTPBearer())):
    if token.credentials != os.environ["ROUTER_AUTH_TOKEN"]:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated",
            headers={"WWW-Authenticate": "Bearer"},
        )


web_app = FastAPI(dependencies=[Depends(verify_token)])
web_app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# load references to modal functions / classes here
embedding_model = modal.Cls.lookup("embedding-cpu", "Model")
spacy_model = modal.Cls.lookup("spacy-es-cpu", "Model")


# ping
class PingResponse(BaseModel):
    message: str


class EndpointStatus(str, Enum):
    UP = "UP"
    DOWN = "DOWN"


class HealthResponse(BaseModel):
    status: EndpointStatus


@web_app.get("/", response_model=PingResponse)
async def ping():
    return {"message": "success"}


# embedding
class EmbeddingResponse(BaseModel):
    data: list[float]


@web_app.get("/embed", response_model=EmbeddingResponse)
async def embed(text: str):
    return {"data": embedding_model.predict.remote(text)}


@web_app.get("/embed/health", response_model=HealthResponse)
async def embed_health():
    print(type(embedding_model))
    app_id = embedding_model.app_id()
    return {"status": EndpointStatus.UP if app_id else EndpointStatus.DOWN}


# spacy processing
class PosTag(str, Enum):
    ADJ = "ADJ"
    ADP = "ADP"
    PUNCT = "PUNCT"
    ADV = "ADV"
    AUX = "AUX"
    SYM = "SYM"
    INTJ = "INTJ"
    CCONJ = "CCONJ"
    X = "X"
    NOUN = "NOUN"
    DET = "DET"
    PROPN = "PROPN"
    NUM = "NUM"
    VERB = "VERB"
    PART = "PART"
    PRON = "PRON"
    SCONJ = "SCONJ"


class DepTag(str, Enum):
    ROOT = "ROOT"
    ACL = "acl"
    ADVCL = "advcl"
    ADVMOD = "advmod"
    AMOD = "amod"
    APPOS = "appos"
    AUX = "aux"
    CASE = "case"
    CC = "cc"
    CCOMP = "ccomp"
    COMPOUND = "compound"
    CONJ = "conj"
    COP = "cop"
    CSUBJ = "csubj"
    DEP = "dep"
    DET = "det"
    EXPL = "expl"
    FIXED = "fixed"
    FLAT = "flat"
    IOBJ = "iobj"
    MARK = "mark"
    NMOD = "nmod"
    NSUBJ = "nsubj"
    NUMMOD = "nummod"
    OBJ = "obj"
    OBL = "obl"
    PARATAXIS = "parataxis"
    PUNCT = "punct"
    XCOMP = "xcomp"


class SpacyToken(BaseModel):
    text: str
    pos: PosTag
    dep: DepTag
    lemma: str
    is_sent_start: bool


class SpacyProcessResponse(BaseModel):
    data: list[SpacyToken]


@web_app.get("/process", response_model=SpacyProcessResponse)
async def process(text: str):
    return {"data": spacy_model.process.remote(text)}


# chat
class AvailableModels(str, Enum):
    gpt_3_5_turbo = "gpt-3.5-turbo"


class Role(str, Enum):
    system = "system"
    user = "user"
    assistant = "assistant"


class Message(BaseModel):
    role: Role
    content: str


class ChatStreamRequest(BaseModel):
    messages: list[Message]
    model: AvailableModels


@web_app.post("/chat/stream", response_class=StreamingResponse)
async def chat_stream(request: ChatStreamRequest):
    def stream():
        response = completion(
            model=request.model, messages=request.messages, stream=True
        )
        for part in response:
            yield part.choices[0].delta.content or ""

    return StreamingResponse(stream(), media_type="text/event-stream")


# register the app
image = Image.debian_slim(python_version="3.12").pip_install("litellm")


@stub.function(
    image=image,
    secrets=[
        modal.Secret.from_name("router-auth-token"),
        modal.Secret.from_name("openai-api-key"),
    ],
    enable_memory_snapshot=True,
    concurrency_limit=1,
)
@modal.asgi_app()
def app():
    return web_app
