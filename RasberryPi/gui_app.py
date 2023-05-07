from tkinter import *
from tkinter import ttk

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

    for i, text in enumerate(labels_text):
        label = Label(frame, text=text, font=myfont, bg=bg_color, fg=fg_color)
        label.grid(column=0, row=i, pady=5, padx=(0, 10), sticky='w')

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

    window.mainloop()

if __name__=="__main__":
    run()