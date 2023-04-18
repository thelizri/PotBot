from os.path import exists
import subprocess

def connect_to_network():
    with open('~/Desktop/PotBot/RasberryPi/Flask/networkUserAndPassword.txt', 'r') as credentials:
        ssid = credentials.readline()
        pass_ = credentials.readline()
        subprocess.run(['nmcli', 'device', 'disconnect', 'wlan0'])
        subprocess.run(['nmcli', 'device', 'wifi', 'connect', ssid, 'password', pass_], stdout=subprocess.PIPE, text=True)

def enable_hotspot():
    subprocess.run(['nmcli', 'connection', 'up', 'Hotspot'])

def _main():
    if exists('~/Desktop/PotBot/RasberryPi/Flask/networkUserAndPassword.txt'):
        connect_to_network()
        return
    enable_hotspot()

if __name__ == '__main__':
    _main()
