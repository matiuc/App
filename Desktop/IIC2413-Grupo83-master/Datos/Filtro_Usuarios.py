#Lector Archivos v1
#Autor Matias Cea

import csv
lista=[]
with open('usuarios-reservas-hoteles.csv', 'r') as csvfile:
     reader = csv.reader(csvfile)
     for row in reader:
         lista.append([row[0], row[1], row[2], row[3], row[4]])
    
lista.pop(0)
lista_filtrada=[]
for x in lista:
    variable = True
    for y in lista_filtrada:
        if (x[0])==(y[0]):
            variable = False
            
    if variable:
        lista_filtrada.append(x)
def take(elem):
    return int(elem[0])
lista_filtrada.sort(key=take)


#--------------------- Escribir Archivo----------------------
f = open('Usuarios.csv', 'a')

with f:
    writer = csv.writer(f)
    for row in lista_filtrada:
        writer.writerow(row)
