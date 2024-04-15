import os

import modal

MODEL_DIR = "/model"
MODEL_NAME = "sentence-transformers/all-MiniLM-L6-v2"


stub = modal.Stub("embedding-cpu")


def download_model_to_image(model_dir, model_name):
    from huggingface_hub import snapshot_download
    from transformers.utils import move_cache

    os.makedirs(model_dir, exist_ok=True)

    snapshot_download(
        model_name,
        local_dir=model_dir,
        ignore_patterns=["*.pt", "*.bin", "*.h5", "*.ot"],  # Using safetensors
    )
    move_cache()


image = (
    modal.Image.debian_slim(python_version="3.12")
    .pip_install("sentence-transformers", "hf_transfer")
    .env({"HF_HUB_ENABLE_HF_TRANSFER": "1"})
    .run_function(
        download_model_to_image,
        timeout=60 * 20,
        kwargs={"model_dir": MODEL_DIR, "model_name": MODEL_NAME},
    )
)


@stub.cls(image=image, enable_memory_snapshot=True, concurrency_limit=1)
class Model:
    @modal.enter(snap=True)
    def start_engine(self):
        from sentence_transformers import SentenceTransformer

        self.model = SentenceTransformer(MODEL_DIR)

    @modal.method()
    def predict(self, text: str):
        prediction = self.model.encode(text).tolist()
        return prediction
