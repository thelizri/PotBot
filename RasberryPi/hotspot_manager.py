from time import sleep
import multiprocessing
import os
import subprocess
import sys
import website

abspath = os.path.dirname(os.path.abspath(__file__))
os.chdir(abspath)

def connect_to_network():
    with open('networkUserAndPassword.txt', 'r') as credentials:
        ssid = credentials.readline().strip()
        pass_ = credentials.readline().strip()
        subprocess.run(['nmcli', 'device', 'disconnect', 'wlan0'])
        sleep(5)
        subprocess.run(['nmcli', 'device', 'wifi', 'list'], stdout=subprocess.PIPE, text=True)
        for i in range(3):
            output = subprocess.run(['nmcli', 'device', 'wifi', 'connect', ssid, 'password', pass_], stderr=subprocess.PIPE, text=True)          
            if 'Error: No network with SSID' in output.stderr:
                sleep(0.1)
                continue
            else:
                return True
    
    #remove wifi credentials
    os.remove('networkUserAndPassword.txt')
    return False

def enable_hotspot():
    subprocess.run(['nmcli', 'connection', 'up', 'Hotspot'])
    website.start_website()

def wait_for_user_wifi():
    while not os.path.exists('networkUserAndPassword.txt'):
        sleep(0.5)

def _main():
    while True:
        if not os.path.exists('networkUserAndPassword.txt'):
            try:
                enable_hotspot()
            except:
                print('something went wrong')
            #wait_for_user_wifi()
            #process = multiprocessing.Process(target=wait_for_user_wifi)
            #process.start()
            #process.join()
        if os.path.exists('networkUserAndPassword.txt') and connect_to_network():
            break

if __name__ == '__main__':
    _main()
