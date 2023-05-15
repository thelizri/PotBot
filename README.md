# PotBot

II1302 VT23 Projects and Project Methods  
Repository For Group 5

## Website

- https://potbot-9f9ff.web.app/

## Background

The idea behind this project is to create a smart plant pot that can automatically water plants, while also measuring
and recording various environmental factors to ensure optimal plant growth. Here's a breakdown of each of the proposed
features:

Automatic Plant Watering:
The smart plant pot will use sensors to detect the soil moisture levels and will water the plant automatically when the
soil becomes too dry. This will ensure that the plant is always well hydrated without the need for manual watering.

Light Level Monitoring:
The smart plant pot will also measure and record the light levels around the plant, which is important for plant growth.
The sensor can be placed at the top of the pot to measure the intensity of the light that the plant is receiving, and
can be used to adjust the position of the pot to ensure that the plant is getting enough light.

Soil Moisture Monitoring:
The smart plant pot will measure and record the soil moisture levels, which is important to prevent over or under
watering. The sensor can be placed in the soil and will detect the moisture content of the soil, providing data that can
be used to trigger the automatic watering feature.

Temperature Monitoring:
The smart plant pot will also measure and record the temperature around the plant, which is important for plant growth.
The sensor can be placed at the top of the pot to measure the ambient temperature and can be used to adjust the position
of the pot to ensure that the plant is not exposed to extreme temperatures.

Overall, the smart plant pot will provide a convenient way to ensure that plants are healthy and thriving, without the
need for constant monitoring and manual intervention. The data collected by the various sensors can also be used to
analyze and optimize plant growth over time.

![alt text](https://github.com/thelizri/PotBot/blob/prototype-image/PotBotProtoype.png?raw=true)

## Developers

Andreas: afranke@kth.se  
Mahad: mahadah@kth.se  
Otto: ottoeh@kth.se  
Pontus: kinnmark@kth.se  
Robert: rfu@kth.se  
Veronica: nadler@kth.se  
William: wcar@kth.se

# Git

## Common Commands

- git init: Initializes a new Git repository in the current directory.
- git clone <repository>: Creates a copy of a remote repository on your local machine.
- git add <file(s)>: Adds file(s) to the staging area, preparing them for a commit.
- git commit -m "<message>": Commits the staged changes to the repository with a descriptive message.
- git status: Shows the status of your working directory, including modified, staged, and untracked files.
- git diff: Shows differences between the working directory and the latest commit.
- git log: Displays a log of all commits in the repository.
- git remote add <name> <url>: Adds a remote repository to your local repository with a reference name.
- git fetch <remote>: Fetches changes from a remote repository but does not merge them.
- git pull <remote>: Fetches changes from a remote repository and merges them into the current branch.
- git push <remote> <branch>: Pushes your local commits to the specified remote repository and branch.
- git branch: Lists all branches in the repository and shows the current branch.

## Git Merging

Merging in Git is the process of combining two branches. If you have a main branch and a feature branch, and you have
completed implementing your new updates in the feature branch, you can merge it into the main branch using the following
Git commands:

- Switch to the main branch using the command: `git checkout main`
- Merge the feature branch into the main branch using the command: `git merge feature`

This will merge the feature branch into the main branch without affecting the feature branch itself.

On the other hand, if you are working on a feature branch and the main branch is updated with new changes, it is
recommended to merge the main branch into your feature branch. To achieve this, switch to the feature branch and enter
the command: `git merge main`. This will merge the new updates in main into the feature branch you are working on,
without affecting the main branch. It is a good practice to perform this operation whenever the main branch is updated,
as it helps to minimize merge conflicts.

## Git Rules

1. Don't commit directly to master
2. Don't merge your own commits

# Raspberry Pi

## Access

- If you access the device through a LAN-cable, the Raspberry Pi can be reached at this address: 169.254.246.9/16
- Username: pi
- Password: group5pass

## Install NetworkManager

- https://linuxhint.com/install-network-manager-raspberry-pi/

## Install DNSmasq

- https://raspberrytips.com/raspberry-pi-dns-server/

## Fix Time Syncing

- https://raspberrytips.com/time-sync-raspberry-pi/

## PotBot

- Network address: 10.42.0.1:80
- Network address: pot.bot

## DNS

- Hosts can be found -> /etc/hosts
- DNS settings can be found -> /etc/dnsmasq.conf

## Network Manager Commands

- `nmcli device disconnect wlan0`
- `nmcli device wifi list`
- `nmcli connection show`
- `nmcli connection up name`
- `nmcli device wifi connect SSID_or_BSSID password password`

## Activate Scripts on Startup

- Add line below to /etc/rc.local
- `/usr/bin/Python3 /home/pi/Desktop/PotBot/RasberryPi/hotspot_manager.py &`

### Install Python Packages for Root

- `sudo pip3 install google-auth google-auth-oauthlib google-auth-httplib2 google-api-python-client`
- `sudo pip install firebase-admin`

## Allow Anybody to Call XHost

- `sudo nano /etc/X11/Xwrapper.config`
- `allowed_users = anybody`
