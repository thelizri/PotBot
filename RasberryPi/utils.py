import os
import datetime


# Checks if a file exist. Check if it is empty. If it is neither, return true.
def check_if_file_exist_and_is_not_empty(filepath):
    if os.path.exists(filepath):
        if os.path.getsize(filepath) != 0:
            return True
        else:
            print("File is empty " + filepath)
            return False
    print("File does not exist " + filepath)
    return False


# Save timestamp to a file
def save_timestamp_to_file(filename):
    with open(filename, "w") as file:
        timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        file.write(timestamp)


# Get the current timestamp
def get_timestamp():
    return datetime.datetime.now()


# Read timestamp from the file
def read_timestamp_from_file(filename):
    with open(filename, "r") as file:
        timestamp_str = file.read()
        timestamp = datetime.datetime.strptime(timestamp_str, "%Y-%m-%d %H:%M:%S")
        return timestamp


# Calculate the difference between two timestamps in hours
def time_difference_in_hours(timestamp1, timestamp2):
    time_difference = abs(timestamp2 - timestamp1)
    return time_difference.total_seconds() / 3600
