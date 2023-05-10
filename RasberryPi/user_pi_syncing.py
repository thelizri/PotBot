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


def is_linked_with_user(db):
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


def link_pi_with_user(db):
    try:
        ref = db.reference("/potbots")
        product_id_file = open("product.id", "r")
        product_id = product_id_file.readline().strip()
        ref.update({product_id: ""})

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
        db.reference(f"/users/{uid}/plants/{plant}").update({"productID": product_id})
    except Exception as error:
        handle_errors("user_pi_syncing_error.log", error)


def run(db):
    if not is_linked_with_user(db):
        print("Is not linked with user")
        link_pi_with_user(db)


if __name__ == "__main__":
    run()
