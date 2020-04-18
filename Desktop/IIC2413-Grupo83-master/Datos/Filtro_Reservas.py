#Lector Archivos v1
#Autor Matias Cea

import csv
lista=[]
with open('usuarios-reservas-hoteles.csv', 'r') as csvfile:
     reader = csv.reader(csvfile)
     for row in reader:
         if row[7]!="":
             lista.append([row[0], row[7], row[5], row[6]])
    
lista.pop(0)
lista_filtrada=[]
id=1
for x in lista:
    variable = True
    for y in lista_filtrada:
        if (x[0], x[1])==(y[1], y[2]) and (x[2], x[3])==(y[3], y[4]):
            variable = False
    if variable:
        lista_filtrada.append([id, x[0], x[1], x[2], x[3] ])
        id+=1
def take(elem):
    return int(elem[0])
lista_filtrada.sort(key=take)


#--------------------- Escribir Archivo----------------------
f = open('Reservas.csv', 'a')

with f:
    writer = csv.writer(f)
    for row in lista_filtrada:
        writer.writerow(row)
