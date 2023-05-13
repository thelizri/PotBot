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
connection_state_listener = None

def is_linked_with_user():
    global product_id, uid, plant_name
    
    try:
        with open("product.id", "r") as product_id_file:
            product_id = product_id_file.readline().strip()
    except Exception as error:
        handle_errors("user_pi_syncing_error.log", error)

    try:
        with open("user.id", "r") as user_id_file:
            uid = user_id_file.readline().strip()
        with open("plant.id", "r") as plant_name_file:
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
    print("-----_link_pi_with_user called-----")
    global uid, plant_name, is_linked, connection_state_listener
    data = event.data
    print(f"-----data received: {data}-----")
    if data == None or data == "" or data == "Raspberry Pi":
        return

    uid = data["uid"]
    user_id_file = open("user.id", "w")
    user_id_file.write(uid)
    user_id_file.close()

    plant_name = data["plant"]
    plant_file = open("plant.id", "w")
    plant_file.write(plant_name)
    plant_file.close()

    db.reference(f"/users/{uid}/plants/{plant_name}").update({"productID": product_id})
    db.reference(f"/potbots/{product_id}").delete()
    is_linked = True

    if connection_state_listener != None:
        connection_state_listener.close()
    connection_state_listener = db.reference(f"/users/{uid}/plants/{plant_name}/productID").listen(
                                _connection_state_changed)

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
    except Exception as error:
        handle_errors("user_pi_syncing_error.log", error)


if __name__ == "__main__":
    run()
