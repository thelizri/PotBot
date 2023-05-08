from error_handler import handle_errors
from time import sleep
import os
try:
    import firebase_admin
    from firebase_admin import credentials
    from firebase_admin import db

    abspath = os.path.dirname(os.path.abspath(__file__))
    os.chdir(abspath)
except Exception as error:
    handle_errors("user_pi_syncing_error.log", error)

def __setup():
    try:
        cred = credentials.Certificate("/home/pi/PotBot/RasberryPi/firebase-key.json")
        firebase_admin.initialize_app(
            cred,
            {
                "databaseURL": "https://potbot-9f9ff-default-rtdb.europe-west1.firebasedatabase.app/"
            },
        )
    except Exception as error:
        handle_errors("user_pi_syncing_error.log", error)

def is_linked_with_user():
    try:
        user_id_file = open("user.id", "r")
        uid = user_id_file.readline().strip()
        product_id_file = open("product.id", "r")
        product_id = product_id_file.readline().strip()
        plant_name_file = open("plant.id", "r")
        plant_name = plant_name_file.readline().strip()

        ref = db.reference(f"/users/{uid}/plants/{plant_name}")
        return ref.child("productID").get() == product_id
    except Exception as error:
        handle_errors("user_pi_syncing_error.log", error)
        return False

def link_pi_with_user():
    try:
        ref = db.reference("/potbots")
        product_id_file = open("product.id", "r")
        product_id = product_id_file.readline().strip()
        ref.update({
            product_id: ""
        })

        while ref.child(product_id).get() == "":
            print("Sleep 10")
            sleep(10)

        uid = ref.child(product_id).child("uid").get()
        user_id_file = open("user.id", "w")
        user_id_file.write(uid)

        plant = ref.child(product_id).child("plant").get()
        plant_file = open("plant.id", "w")
        plant_file.write(plant)

        ref.child(product_id).delete()
        db.reference(f"/users/{uid}/plants/{plant}/productID").update(product_id)
    except Exception as error:
        handle_errors("user_pi_syncing_error.log", error)
    
def run():
    __setup()
    if not is_linked_with_user():
        link_pi_with_user()


if __name__ == "__main__":
    run()
