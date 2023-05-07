from tkinter import *
from tkinter import ttk

window = Tk()
window.attributes('-fullscreen', True)
window.title("PotBot")
window.configure(bg='green')

frame = ttk.Frame(window, padding=10)
frame.grid()

myfont = ('Times New Roman', 17, 'bold')

labels_text = ["Water Level: ", "UV light: ", "Soil moisture: ", "Temperature: "]

for i, text in enumerate(labels_text):
    label = Label(frame, text=text, font=myfont, bg='green', fg='white')
    label.grid(column=0, row=i, pady=5, padx=(0, 10), sticky='e')

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
