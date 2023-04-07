import subprocess

# Run the command and capture the output
result = subprocess.run(["sudo", "iwlist", "wlan0", "scan"], stdout=subprocess.PIPE, text=True)

# Save the output to a text file
with open("wifi_scan.txt", "w") as file:
    file.write(result.stdout)