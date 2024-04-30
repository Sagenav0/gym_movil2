from flask import Flask, jsonify, request, session
from datetime import datetime
from mysql.connector import connect
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

config = {
    'host': 'localhost',
    'user': 'root',
    'password': '',
    'database': 'gym_control'
}

@app.route("/")
def index():
    return "Hello World!"


@app.route("/validarCredenciales/<usuario>/<contrasena>", methods=['get'])
def ValidarCredenciales(usuario, contrasena):
    try:
        connection = connect(**config)
        cursor = connection.cursor()
        cursor.execute(f"SELECT nombre FROM registro_usuarios WHERE correo = '{usuario}' AND contrasena = '{contrasena}' AND estado = 'activo'")
        datos = cursor.fetchall()
        
        if(datos):
            cursor.close()
            connection.close()
            return jsonify({"error":"ok"})
        else:
            cursor.close()
            connection.close()
            return jsonify({"error":"notFound"})
    except Exception as e:
        return jsonify({"error": str(e)})
    

@app.route("/consultaCorreo/<correo>", methods=['get'])
def ConsultaCorreo(correo):
    try:
        connection = connect(**config)
        cursor = connection.cursor()
        cursor.execute(f"SELECT correo FROM registro_usuarios WHERE correo = '{correo}'")
        datos = cursor.fetchall()
        
        if(datos):
            cursor.close()
            connection.close()
            return jsonify({"message":"Correo encontrado"})
        else:
            cursor.close()
            connection.close()
            return jsonify({"message":"Correo no encontrado"})
    except Exception as e:
        return jsonify({"error": str(e)})


    
@app.route('/cambiarCorreo', methods=['POST'])
def cambiarCorreo():
    try:
        data = request.get_json()
        correo = data.get('correo')
        usuario = data.get('usuario')

        # Validar los datos recibidos
        if not correo or not usuario:
            return jsonify({"error": "Datos incompletos"}), 400
        
        # Escapar los valores para evitar inyección SQL (opcional dependiendo de la biblioteca que estés utilizando)
        # En este ejemplo, utilizaremos parámetros de consulta para escapar los valores
        connection = connect(**config)
        cursor = connection.cursor()
        cursor.execute("UPDATE registro_usuarios SET correo = %s WHERE correo = %s", (correo, usuario))
        connection.commit()
        cursor.close()
        connection.close()
        return jsonify({"error": "ok"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/cambiarContra', methods=['POST'])
def cambiarContra():
    try:
        data = request.get_json()
        contra1 = data.get('contra1')
        usuario = data.get('usuario')

        connection = connect(**config)
        cursor = connection.cursor()
        cursor.execute("UPDATE registro_usuarios SET contrasena = %s WHERE correo = %s", (contra1, usuario))
        connection.commit()
        cursor.close()
        connection.close()
        return jsonify({"error": "ok"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
    
@app.route('/consultaDatosgym', methods=['GET'])

def consultaDatosgym():
    try:
        connection = connect(**config)
        cursor = connection.cursor()
        cursor.execute("SELECT id_contacto, nombre_gym, telefono_gym, correo_gym, direccion_gym, barrio_gym, hubicacion_gym from contacto_gym  WHERE id_contacto = 1")
        column_names = [column[0] for column in cursor.description]
        datos = cursor.fetchall()
        cursor.close()
        connection.close()
        return jsonify([dict(zip(column_names, dato)) for dato in datos])
    except Exception as e:
        return jsonify({"error": str(e)})
    
@app.route('/consultarAvances', methods= ['POST'])
def consultarAvances():
    try:
        selected_month1 = request.json.get('month1')
        selected_month2 = request.json.get('month2')

        selected_month1_str = datetime.strptime(selected_month1, '%Y-%m-%d').strftime('%Y-%m-%d')
        selected_month2_str = datetime.strptime(selected_month2, '%Y-%m-%d').strftime('%Y-%m-%d')

        print(selected_month1)
        print(selected_month2)

        if selected_month1 is None or selected_month2 is None:
            return jsonify({"error": "Los meses no pueden ser nulos"}), 400

        connection = connect(**config)
        cursor = connection.cursor()
        cursor.execute(f"SELECT * FROM medidas WHERE mes_registro IN ('{selected_month1_str}', '{selected_month2_str}')")
        datos = cursor.fetchall()

        print(datos)

        return jsonify({'medidas': datos})

    except Exception as e:
        return jsonify({"error": str(e)})

    
    
    
if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True, port=8100)