from error_handler import handle_errors
from time import sleep
import os

try:
    from firebase_admin import db
    from firebase_admin import credentials
    from firebase_admin import initialize_app
    abspath = os.path.dirname(os.path.abspath(__file__))
    os.chdir(abspath)

    initialize_app(
        credentials.Certificate("/home/pi/PotBot/RasberryPi/firebase-key.json"),
        {
            "databaseURL": "https://potbot-9f9ff-default-rtdb.europe-west1.firebasedatabase.app/"
        },
    )
except Exception as error:
    handle_errors("user_pi_syncing_error.log", error)

product_id = None
uid = None
plant_name = None
is_linked = False

def is_linked_with_user():
    global product_id, uid, plant_name
    
    try:
        product_id_file = open("product.id", "r")
        product_id = product_id_file.readline().strip()
    except Exception as error:
        handle_errors("user_pi_syncing_error.log", error)

    try:
        user_id_file = open("user.id", "r")
        uid = user_id_file.readline().strip()
        plant_name_file = open("plant.id", "r")
        plant_name = plant_name_file.readline().strip()
    except Exception:
        return False

    try:
        ref = db.reference(f"/users/{uid}/plants/{plant_name}")
        return ref.child("productID").get() == product_id
    except Exception as error:
        handle_errors("user_pi_syncing_error.log", error)
        return False
    
def _link_pi_with_user_setup():
    global is_linked
    is_linked = False
    db.reference(f"/potbots").update({product_id: ""})

def _link_pi_with_user(event):
    global uid, plant_name, is_linked
    data = event.data
    if data == None or data == "" or data == "Raspberry Pi":
        return

    uid = data["uid"]
    user_id_file = open("user.id", "w")
    user_id_file.write(uid)

    plant_name = data["plant"]
    plant_file = open("plant.id", "w")
    plant_file.write(plant_name)

    db.reference(f"/users/{uid}/plants/{plant_name}").update({"productID": product_id})
    db.reference(f"/potbots/{product_id}").delete()
    is_linked = True

def _connection_state_changed(event):
    print("Connection state changed, callback has been called")
    if event.data == None or event.data == "Raspberry Pi":
        _link_pi_with_user_setup()

def run():
    try:
        if not is_linked_with_user():
            print("not linked")
            _link_pi_with_user_setup()
            db.reference(f"/potbots/{product_id}").listen(_link_pi_with_user)
            while not is_linked:
                sleep(5)
        db.reference(f"/users/{uid}/plants/{plant_name}/productID").listen(_connection_state_changed)
    except Exception as error:
        handle_errors("user_pi_syncing_error.log", error)


if __name__ == "__main__":
    run()
