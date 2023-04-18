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
    
    return f'SSID: {ssid}, Password: {password}'

def write_ssid_and_password_to_file(ssid, password):
    file = open("networkUserAndPassword.txt", "w")
    file.write(ssid)
    file.write("\n")
    file.write(password)
    file.close()

def start_website():
    app.run(debug=True, host="10.42.0.1", port=80)
