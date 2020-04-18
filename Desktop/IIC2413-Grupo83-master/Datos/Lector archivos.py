#Lector Archivos v1
#Autor Matias Cea

import csv
lista=[]
with open('ciudades-paises.csv', 'r') as csvfile:
     reader = csv.reader(csvfile)
     for row in reader:
         lista.append([row[1], row[2]])
    
lista.pop(0)
lista_filtrada=[]
id=1
for x in lista:
    variable = True
    for y in lista_filtrada:
        if x[0]==y[1]:
            variable = False
            
    if variable:
        lista_filtrada.append([id, x[0], x[1]])
        id+=1
def take(elem):
    return int(elem[0])
lista_filtrada.sort(key=take)


#--------------------- Escribir Archivo----------------------
f = open('Paises.csv', 'a')

with f:
    writer = csv.writer(f)
    for row in lista_filtrada:
        writer.writerow(row)
