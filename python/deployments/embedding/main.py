import time

import modal

f = modal.Cls.lookup("embedding-cpu", "Model")

start_time = time.time()
print(f.predict.remote("hello world"))  # 25
print(time.time() - start_time)
