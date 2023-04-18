from flask import Flask, render_template, request
import subprocess

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/', methods=['POST'])
def ssid_password():
    ssid = request.form['ssid']
    password = request.form['password']
    write_ssid_and_password_to_file(ssid, password)
    connect_to_network()
    
    return f'SSID: {ssid}, Password: {password}'

def write_ssid_and_password_to_file(ssid, password):
    file = open("networkUserAndPassword.txt", "w")
    file.write(ssid)
    file.write("\n")
    file.write(password)
    file.close()

def connect_to_network():
    file = open("networkUserAndPassword.txt", "r")
    ssid = file.readline().strip()
    password = file.readline().strip()
    file.close()

    #nmcli device wifi connect SSID_or_BSSID password password
    
    result = subprocess.run(["nmcli", "device", "wifi", "connect", ssid, "password", password], stdout=subprocess.PIPE, text=True)
    print(result)

if __name__ == '__main__':
    app.run(debug=True)
