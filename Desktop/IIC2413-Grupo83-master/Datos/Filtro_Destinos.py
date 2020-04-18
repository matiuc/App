#Lector Archivos v1
#Autor Matias Cea

import csv
lista=[]
with open('tickets-destinos.csv', 'r') as csvfile:
     reader = csv.reader(csvfile)
     for row in reader:
         lista.append([row[1], row[2], row[4]])
    
lista.pop(0)
lista_filtrada=[]
for x in lista:
    variable = True
    for y in lista_filtrada:
        if (x[0], x[1])==(y[0], y[1]) and x[2]==y[2]:
            variable = False
        if (x[0], x[1])==(y[0], y[1]) and x[2]!=y[2]:
            print(x, y)
            
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
f = open('Destinos.csv', 'a')

with f:
    writer = csv.writer(f)
    for row in lista_filtrada:
        writer.writerow(row)
