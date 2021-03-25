import os
import pydicom
import xml.etree.ElementTree as ET

tree = ET.parse('allImageMetadata.xml')
root = tree.getroot()

print("ask for absolut path to directory:")
directory = input()

for filename in os.listdir(directory):
    if filename.endswith(".dcm"):
        ds = pydicom.filereader.dcmread(os.path.join(directory, filename))
        ds.PatientName = "StaTurHaeb Muttenz"
        comment = "Pulp Fiction"
        print(filename)
        for child in root:
            if child.attrib["src"].rsplit(".")[0] == filename.rsplit(".")[0]:
                for child2 in child:
                    if child2.tag == "description":
                        comment = child2.text
        comment = comment[1:-1]
        ds.add_new('0x204000', 'LT', comment)
        ds.save_as(directory+"/"+filename)
    else:
        continue
print("Finished")