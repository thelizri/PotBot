import os

def check_if_file_exist_and_is_not_empty(filepath):
    if os.path.exists(filepath):
        if os.path.getsize(filepath) != 0:
            return True
        else:
            print("File is empty "+filepath)
            return False
    print("File does not exist "+filepath)
    return False