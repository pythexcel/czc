import uuid, os, openai


def get_file_path(instance, filename):
    file_dir = instance.file_dir
    ext = filename.split('.')[-1]
    filename = "%s.%s" % (uuid.uuid4(), ext)
    return os.path.join(file_dir, filename)


def check_openai_api_key(api_key):
    openai.api_key = api_key
    try:
        openai.Model.list()
    except openai.error.AuthenticationError:
        return False
    else:
        return True
    