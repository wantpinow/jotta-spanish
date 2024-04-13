from time import time

import modal

f = modal.Function.lookup("example-embedding-cpu", "Model.predict")

start_time = time()
f.remote("This is a test.")
print("Time taken:", time() - start_time)

start_time = time()
batch = [
    "This is a test.",
    "This is another test.",
    "This is a third test.",
    "This is a fourth test.",
    "This is a fifth test.",
    "This is a sixth test.",
    "This is a seventh test.",
    "This is an eighth test.",
    "This is a ninth test.",
    "This is a tenth test.",
]
for embedding in f.map(batch):
    pass
print("Time taken:", time() - start_time)
