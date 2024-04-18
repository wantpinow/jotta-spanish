import modal

MODEL_NAME = "es_core_news_md"


def download_model_to_image(model_name):
    import spacy.cli

    spacy.cli.download(model_name)


image = (
    modal.Image.debian_slim(python_version="3.12")
    .pip_install("spacy")
    .run_function(
        download_model_to_image,
        timeout=60 * 20,
        kwargs={"model_name": MODEL_NAME},
    )
)


stub = modal.Stub("spacy-es-cpu")


@stub.cls(image=image, enable_memory_snapshot=True, concurrency_limit=1)
class Model:
    @modal.enter(snap=True)
    def start_engine(self):
        import spacy

        self.nlp = spacy.load("es_core_news_md")

    @modal.method()
    def process(self, text: str):
        doc = self.nlp(text)
        return [
            {
                "text": token.text,
                "pos": token.pos_,
                "dep": token.dep_,
                "lemma": token.lemma_,
                "is_sent_start": token.is_sent_start,
            }
            for token in doc
        ]
