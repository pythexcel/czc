import openai


def open_ai_is_valid(open_ai_key):
    openai.api_key = open_ai_key
    try:
        openai.models.list()
        return True
    except Exception as e:
        print("your error is ",e)
        return False