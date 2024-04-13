from time import time

import modal

f = modal.Function.lookup("example-get-started", "square")

start_time = time()
print(f.remote(4))
print("Time taken:", time() - start_time)
