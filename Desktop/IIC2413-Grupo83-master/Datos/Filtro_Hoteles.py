#Lector Archivos v1
#Autor Matias Cea

import csv
lista=[]
with open('usuarios-reservas-hoteles.csv', 'r') as csvfile:
     reader = csv.reader(csvfile)
     for row in reader:
         if row[7]!='':
             lista.append([row[7], row[8], row[9], row[10], row[11], row[12] ])
    
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

ciudad=[]
with open('Ciudades.csv', 'r') as csvfile:
     reader = csv.reader(csvfile)
     for row in reader:
        ciudad.append([row[0], row[1]])
lista_final=[]
for x in lista_filtrada:
    lista_1=[]
    for y in ciudad:
        if (x[5])==(y[1]):
            for l in range(0, 5):
                lista_1.append(x[l])
            lista_1.append(y[0])
            
            
    lista_final.append(lista_1)



#--------------------- Escribir Archivo----------------------
f = open('Hoteles.csv', 'a')

with f:
    writer = csv.writer(f)
    for row in lista_final:
        writer.writerow(row)
