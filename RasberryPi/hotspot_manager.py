from os.path import exists
from time import sleep
import multiprocessing
import subprocess
import sys
sys.path.append("Flask")
import website

def connect_to_network():
    with open('networkUserAndPassword.txt', 'r') as credentials:
        ssid = credentials.readline().strip()
        pass_ = credentials.readline().strip()
        subprocess.run(['nmcli', 'device', 'disconnect', 'wlan0'])
        sleep(5)
        subprocess.run(['nmcli', 'device', 'wifi', 'list'], stdout=subprocess.PIPE, text=True)
        subprocess.run(['nmcli', 'device', 'wifi', 'connect', ssid, 'password', pass_], stdout=subprocess.PIPE, text=True)

def enable_hotspot():
    subprocess.run(['nmcli', 'connection', 'up', 'Hotspot'])
    website.start_website()

def wait_for_user_wifi():
    while not exists('networkUserAndPassword.txt'):
        sleep(0.5)

def _main():
    if not exists('networkUserAndPassword.txt'):
        try:
            enable_hotspot()
        except:
            print('something went wrong')
        #wait_for_user_wifi()
        #process = multiprocessing.Process(target=wait_for_user_wifi)
        #process.start()
        #process.join()
    connect_to_network()

if __name__ == '__main__':
    _main()
