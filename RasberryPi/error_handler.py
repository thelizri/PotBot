from datetime import datetime

def handle_errors(log_file, error):
    logfile = open(log_file, "w+")
    logfile.write(datetime.now().strftime("%Y-%m-%d %H:%M:%S: "))
    logfile.write(str(error))
    logfile.write("\n")
