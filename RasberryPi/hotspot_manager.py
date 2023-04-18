from os.path import exists
import subprocess
import sys
sys.path.append("Flask")
import website

def connect_to_network():
    with open('./Flask/networkUserAndPassword.txt', 'r') as credentials:
        ssid = credentials.readline().strip()
        pass_ = credentials.readline().strip()
        subprocess.run(['nmcli', 'device', 'disconnect', 'wlan0'])
        subprocess.run(['nmcli', 'device', 'wifi', 'connect', ssid, 'password', pass_], stdout=subprocess.PIPE, text=True)

def enable_hotspot():
    subprocess.run(['nmcli', 'connection', 'up', 'Hotspot'])
    website.start_website()


def _main():
    if exists('./Flask/networkUserAndPassword.txt'):
        connect_to_network()
        return
    enable_hotspot()

if __name__ == '__main__':
    _main()
