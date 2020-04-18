#Lector Archivos v1
#Autor Matias Cea

import csv
lista=[]
with open('Destinos.csv', 'r') as csvfile:
     reader = csv.reader(csvfile)
     for row in reader:
         lista.append(row)
ciudad=[]
with open('Ciudades.csv', 'r') as csvfile:
     reader = csv.reader(csvfile)
     for row in reader:
         ciudad.append(row)

lista_filtrada=[]
for x in lista:
    for y in ciudad:
        if x[2]==y[1]:
            lista_filtrada.append([x[0], x[1], y[0], x[3]])
lista_filtrada2=[]
for x in lista_filtrada:
    for y in ciudad:
        if x[3]==y[1]:
            lista_filtrada2.append([x[0], x[1], x[2], y[0]])
                
    
    
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
f = open('Destinos2.csv', 'a')

with f:
    writer = csv.writer(f)
    for row in lista_filtrada2:
        writer.writerow(row)
