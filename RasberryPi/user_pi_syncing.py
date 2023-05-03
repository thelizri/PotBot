from error_handler import handle_errors
try:
    import firebase_admin
    from firebase_admin import credentials
    from firebase_admin import db
except Exception as error:
    handle_errors("user_pi_syncing_error.log", error)
import os

def link_pi_with_user():
    abspath = os.path.dirname(os.path.abspath(__file__))
    os.chdir(abspath)

    cred = credentials.Certificate("/home/pi/PotBot/RasberryPi/firebase-key.json")
    firebase_admin.initialize_app(
        cred,
        {
            "databaseURL": "https://potbot-9f9ff-default-rtdb.europe-west1.firebasedatabase.app/"
        },
    )

    ref = db.reference("/potbots")
    with open("product_id.txt", "r") as id_file:
        product_id = id_file.readline()
        ref.update({
            product_id: ""
        })
        #TODO
        #Check if user id has been supplied and store it in a file.
        #Change static references to user with user id found in above file.
        print(ref.child(product_id).get())
