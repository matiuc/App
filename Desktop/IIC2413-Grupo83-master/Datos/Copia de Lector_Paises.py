#Lector Archivos v1
#Autor Matias Cea

import csv
lista=[]
with open('Destinos.csv', 'r') as csvfile:
     reader = csv.reader(csvfile)
     for row in reader:
         lista.append([row[0], row[3], row[1], row[2]])


#--------------------- Escribir Archivo----------------------
f = open('Destinos1.csv', 'a')

with f:
    writer = csv.writer(f)
    for row in lista:
        writer.writerow(row)
