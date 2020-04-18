#Lector Archivos v1
#Autor Matias Cea

import csv
lista=[]
with open('ciudades-paises.csv', 'r') as csvfile:
     reader = csv.reader(csvfile)
     for row in reader:
         lista.append([row[0], row[1]])
pais=[]
with open('Paises.csv', 'r') as csvfile:
     reader = csv.reader(csvfile)
     for row in reader:
         pais.append(row)

lista.pop(0)
lista_filtrada=[]
id=1
for x in lista:
    lista1=[]
    for y in pais:
        if (x[1]) == (y[1]):
            lista1.append(id)
            lista1.append(x[0])
            lista1.append(y[0])
            id+=1
                
    lista_filtrada.append(lista1)
    
#lista_filtrada=[]
#
#for x in lista:
#    variable = True
#    for y in lista_filtrada:
#        if (x[1], x[2])==(y[1], y[1]):
#            variable = False
#            
#    if variable:
#        lista_filtrada.append(x)
#i=1
#for x in lista_filtrada:
#    x.insert(0, i)
#    i+=1
    
#def take(elem):
#    return int(elem[0])
#lista_filtrada.sort(key=take)
#print(lista_filtrada)

#
#--------------------- Escribir Archivo----------------------
f = open('Ciudades.csv', 'a')

with f:
    writer = csv.writer(f)
    for row in lista_filtrada:
        writer.writerow(row)
