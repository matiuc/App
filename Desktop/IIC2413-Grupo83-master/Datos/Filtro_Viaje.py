#Lector Archivos v1
#Autor Matias Cea

import csv
lista=[]
with open('tickets-destinos.csv', 'r') as csvfile:
     reader = csv.reader(csvfile)
     for row in reader:
         if row[8]!="":
             lista.append(row)
des=[]
with open('destinos.csv', 'r') as csvfile:
     reader = csv.reader(csvfile)
     for row in reader:
         des.append(row)
trans=[]
with open('transportes.csv', 'r') as csvfile:
     reader = csv.reader(csvfile)
     for row in reader:
         trans.append(row)
via=[]
with open('viajes.csv', 'r') as csvfile:
     reader = csv.reader(csvfile)
     for row in reader:
         via.append(row)
lista.pop(0)


lista_final=[]
for x in lista:
    lista_1=[]
    for z in trans:
        if (x[5])==(z[1]):
            lista_1.append(x[0])
            lista_1.append(x[1])
            lista_1.append(x[2])
            lista_1.append(x[3])
            lista_1.append(x[4])
            lista_1.append(z[0])
            lista_1.append(x[6])
            lista_1.append(x[7])
            lista_1.append(x[8])
            lista_1.append(x[9])
            lista_1.append(x[10])
            
    lista_final.append(lista_1)
    
lista_final2=[]
for x in lista_final:
    lista_1=[]
    for z in des:
        if (x[1], x[2], x[4])==(z[1], z[2], z[3]):
            lista_1.append(x[0])
            lista_1.append(z[0])
            lista_1.append(x[3])
            lista_1.append(x[5])
            lista_1.append(x[6])
            lista_1.append(x[7])
            lista_1.append(x[8])
            lista_1.append(x[9])
            lista_1.append(x[10])
            
    lista_final2.append(lista_1)

lista_final3=[]
for x in lista_final2:
    lista_1=[]
    for z in via:
        if (x[2], x[3], x[1], x[5])==(z[1], z[2], z[3], z[4]):
            lista_1.append(x[8])
            lista_1.append(x[7])
            lista_1.append(x[6])
            lista_1.append(z[0])
            lista_1.append(x[0])
            
            
            
    lista_final3.append(lista_1)

lista_filtrada=[]

for x in lista_final3:
    variable = True
    for y in lista_filtrada:
        if x==y:
            variable = False
            
    if variable:
        lista_filtrada.append(x)
i=1
for x in lista_filtrada:
    x.insert(0, i)
    i+=1
    
def take(elem):
    return int(elem[0])
lista_filtrada.sort(key=take)
#
#--------------------- Escribir Archivo----------------------
f = open('Tickets.csv', 'a')

with f:
    writer = csv.writer(f)
    for row in lista_filtrada:
        writer.writerow(row)
