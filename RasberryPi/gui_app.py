from tkinter import *
from tkinter import ttk
import json

counter = -1

def update_labels(label_vars, window):

    data = None
    with open("last_measurement.json", "r") as file:
        data = json.load(file)
    global counter
    counter += 1
    label_vars[0].set("Water Level: "+str(data["waterLevel"])+" "+str(counter))
    label_vars[1].set("UV Light: "+str(data["uvLight"])+" "+str(counter))
    label_vars[2].set("Soil Moisture: "+str(data["soilMoisture"])+" "+str(counter))
    label_vars[3].set("Temperature: "+str(data["temperature"])+" "+str(counter))
    # Schedule the next update
    window.after(1000, lambda : update_labels(label_vars, window))

def run():
    bg_color = "#94C973"
    fg_color = "#000209"

    window = Tk()
    window.attributes('-fullscreen', True)
    window.title("PotBot")
    window.configure(bg=bg_color)

    style = ttk.Style()
    style.configure('TFrame', background=bg_color)

    frame = ttk.Frame(window, padding=10, style="TFrame")
    frame.grid()

    myfont = ('Times New Roman', 22, 'bold')

    labels_text = ["Water Level: ", "UV light: ", "Soil moisture: ", "Temperature: "]
    label_vars = []

    for i, text in enumerate(labels_text):
        label_var = StringVar()
        label_var.set(text)
        label = Label(frame, textvariable=label_var, font=myfont, bg=bg_color, fg=fg_color)
        label.grid(column=0, row=i, pady=5, padx=(0, 10), sticky='w')
        label_vars.append(label_var)

    ttk.Button(frame, text="Quit", command=window.destroy).grid(column=0, row=4, pady=10)

    # Centering the frame on the window
    frame.update_idletasks()
    frm_width = frame.winfo_width()
    frm_height = frame.winfo_height()
    window_width = window.winfo_width()
    window_height = window.winfo_height()
    x_offset = (window_width - frm_width) // 2
    y_offset = (window_height - frm_height) // 2

    frame.place(x=x_offset, y=y_offset)

    update_labels(label_vars, window)
    window.mainloop()

if __name__=="__main__":
    run()