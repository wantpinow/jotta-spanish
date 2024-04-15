import os

import modal
from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
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


# load references to modal functions / classes here
embedding_model = modal.Cls.lookup("embedding-cpu", "Model")
spacy_model = modal.Cls.lookup("spacy-es-cpu", "Model")


@web_app.get("/")
async def ping():
    return {"message": "success"}


class EmbeddingResponse(BaseModel):
    data: list[float]


@web_app.get("/embed", response_model=EmbeddingResponse)
async def embed(text: str):
    return {"data": embedding_model.predict.remote(text)}


class SpacyToken(BaseModel):
    text: str
    pos: str
    dep: str
    lemma: str


class SpacyProcessResponse(BaseModel):
    data: list[SpacyToken]


@web_app.get("/process", response_model=SpacyProcessResponse)
async def process(text: str):
    return {"data": spacy_model.process.remote(text)}


@stub.function(
    secrets=[
        modal.Secret.from_name("router-auth-token"),
    ]
)
@modal.asgi_app()
def app():
    return web_app
