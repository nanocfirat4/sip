import os

print("ask for absolut path to directory:")
directory = input()

for filename in os.listdir(directory):
    if filename.endswith(".jpg") or filename.endswith(".png"):
        print(os.path.join(directory, filename))
        command = "img2dcm "+os.path.join(directory, filename)+" "+os.path.join(directory, filename).rsplit(".")[0]+".dcm"
        print(command)
        os.system(command)
    else:
        continue