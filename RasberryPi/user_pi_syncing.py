from error_handler import handle_errors
from time import sleep
try:
    import firebase_admin
    from firebase_admin import credentials
    from firebase_admin import db
except Exception as error:
    handle_errors("user_pi_syncing_error.log", error)
import os

def link_pi_with_user():
    try:
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

        product_id_file = open("product.id", "r")
        product_id = product_id_file.readline().strip()
        ref.update({
            product_id: ""
        })

        while ref.child(product_id).get() == "":
            sleep(10)

        uid = ref.child(product_id).get()
        user_id_file = open("user.id", "w")
        user_id_file.write(uid)

        ref.child(product_id).delete()
    except Exception as error:
        handle_errors("user_pi_syncing_error.log", error)

if __name__ == "__main__":
    link_pi_with_user()
