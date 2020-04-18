#Lector Archivos v1
#Autor Matias Cea

import csv
lista=[]
with open('tickets-destinos.csv', 'r') as csvfile:
     reader = csv.reader(csvfile)
     for row in reader:
         lista.append([row[5], row[6]])
    
lista.pop(0)
lista_filtrada=[]
for x in lista:
    variable = True
    for y in lista_filtrada:
        if (x[0])==(y[0]):
            variable = False
            
    if variable:
        lista_filtrada.append(x)
i=1
for x in lista_filtrada:
    x.insert(0, i)
    i+=1
    
#def take(elem):
#    return int(elem[0])
#lista_filtrada.sort(key=take)
#print(lista_filtrada)


#--------------------- Escribir Archivo----------------------
f = open('Transportes.csv', 'a')

with f:
    writer = csv.writer(f)
    for row in lista_filtrada:
        writer.writerow(row)
