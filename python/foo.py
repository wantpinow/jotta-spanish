import modal
import modal.app_utils

embedding_model = modal.Cls.lookup("embedding-cpu", "Model")

# print(modal.app_utils.list_apps())

# print(embedding_model.lookup("Model"))
# print(modal.App.from_name("embedding-cpu", "Model"))

predict = embedding_model.predict
res = embedding_model.predict.spawn("hello")

print(embedding_model.predict.get_current_stats())
print(res)

# print(modal.functions.FunctionCall.from_id("fc-01HVSQW2Y388YF7Q9K36E4FE0K"))

print(predict.get_current_stats())
