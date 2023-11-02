# import openai

# openai.api_key = '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'

# def is_api_key_valid():
#     try:
#         response = openai.Completion.create(
#             engine="davinci",
#             prompt="This is a test.",
#             max_tokens=5
#         )
#     except:
#         return False
#     else:
#         return True

# # Check the validity of the API key
# api_key_valid = is_api_key_valid()
# print("API key is valid:", api_key_valid)


import openai

def check_openai_api_key(api_key):
    openai.api_key = api_key
    try:
        openai.Model.list()
    except openai.error.AuthenticationError as e:
        return False
    else:
        return True


api_key = "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"
is_valid = check_openai_api_key(api_key)

if is_valid:
    print("Valid OpenAI API key.")
else:
    print("Invalid OpenAI API key.")