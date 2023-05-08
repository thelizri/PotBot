from datetime import datetime
from traceback import format_exc
import utils

def handle_errors(log_file, error):
    mode = "w"
    if utils.check_if_file_exist_and_is_not_empty(log_file):
        mode = "a"
    logfile = open(log_file, mode)
    logfile.write(datetime.now().strftime("%Y-%m-%d %H:%M:%S: "))
    logfile.write(str(error))
    logfile.write(f"\n{format_exc()}")
