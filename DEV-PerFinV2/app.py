from flask import Flask, render_template, request, redirect, url_for, jsonify

from pymongo import MongoClient

import json

#conexion con mongo

client = MongoClient("mongodb://localhost:27017/")

db = client.local.finanzas_db



#flask

app = Flask(__name__)

app.static_folder = 'static'

#rutas

@app.route("/", methods=["GET"])

def index():

    # Supongamos que tienes tu lista 'gastos' en Python

    resultados_gastos = db.gastos.find({}, {"_id": 0, "monto": 1, "fecha": 1})

    resultados_ingresos = db.ingresos.find({}, {"_id": 0, "monto": 1, "fecha": 1})



    # Convierte los resultados en una lista de diccionarios

    gastos = list(resultados_gastos)

    gastos_json = json.dumps(gastos,)



    ingresos = list(resultados_ingresos)

    ingresos_json = json.dumps(ingresos)

    # Pasa 'gastos_json' como variable al contexto de la plantilla

    return render_template('registro_finanzas.html', gastos_json=gastos_json, ingresos_json=ingresos_json)


#calcular total de montos



def calcular_total(coleccion):

    pipeline = [

        {"$group": {"_id": None, "total": {"$sum": "$monto"}}}  # Sumar el campo "monto" en todos los documentos

    ]



    resultado = list(db[coleccion].aggregate(pipeline))



    total = resultado[0]["total"] if resultado else 0



    return total






@app.route("/registro_ingresos.html", methods=["GET", "POST"])

def registro_ingresos():

    if request.method == "POST":

        nombre = request.form["nombre"]

        fecha = request.form["fecha"]

        monto = float(request.form["monto"])



        coleccion = db["ingresos"]



        nuevo_registro = {

            "nombre": nombre,

            "monto": monto,

            "fecha": fecha

        }

        coleccion.insert_one(nuevo_registro)



        return redirect(url_for("registro_ingresos"))

    

    return render_template("registro_ingresos.html")



@app.route("/registro_gastos.html", methods=["GET", "POST"])

def registro_gastos():

    if request.method == "POST":

        tipo_gasto = request.form["tipo_gasto"]

        nombre = request.form["nombre"]

        fecha = request.form["fecha"]

        monto = float(request.form["monto"])



        coleccion = db["gastos"]



        nuevo_registro = {

            "tipo": tipo_gasto,

            "nombre": nombre,

            "monto": monto,

            "fecha": fecha

        }

        coleccion.insert_one(nuevo_registro)



        return redirect(url_for("registro_gastos"))

    

    return render_template("registro_gastos.html")



if __name__ == "__main__":

    app.run(debug=True)

