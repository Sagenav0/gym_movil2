from flask import Flask, jsonify, request, session
from datetime import datetime
from mysql.connector import connect
from flask_cors import CORS, cross_origin
import random
from email.message import EmailMessage
import smtplib
import ssl


app = Flask(__name__)
CORS(app)

config = {
    'host': '85.31.231.136',
    'user': 'controlgym',
    'password': 'ControlGym',
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
        cursor.execute(f"SELECT nombre,telefono,cedula FROM registro_usuarios WHERE correo = '{usuario}' AND contrasena = '{contrasena}' AND estado = 'activo'")
        datos = cursor.fetchall()
        
        if(datos):
            cursor.close()
            connection.close()
            return jsonify({"error":"ok", "datos": datos})
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
    
@app.route('/cambiarTelefono', methods=['POST'])
def cambiarTelefono():
    try:
        data = request.get_json()
        telefono = data.get('telefono')
        cedula = data.get('cedula')
        connection = connect(**config)
        cursor = connection.cursor()
        cursor.execute("UPDATE registro_usuarios SET telefono = %s WHERE cedula = %s", (telefono, cedula))
        connection.commit()
        cursor.close()
        connection.close()
        return jsonify({"error": "ok"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/consultaEditar/<usuario>', methods=['GET'])
def consultaEditar(usuario):
    try:
        connection = connect(**config)
        cursor = connection.cursor()
        cursor.execute(f"SELECT nombre,telefono,cedula FROM registro_usuarios WHERE correo = '{usuario}' AND estado = 'activo'")
        column_names = [column[0] for column in cursor.description]
        datos = cursor.fetchall()
        cursor.close()
        connection.close()
        return jsonify([dict(zip(column_names, dato)) for dato in datos])
    except Exception as e:
        return jsonify({"error": str(e)})   
    
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
@cross_origin()  # Habilita CORS para esta ruta
def consultarAvances():
    try:
        selected_month1 = request.json.get('month1')
        selected_month2 = request.json.get('month2')
        identificador = request.json.get('identificador')
        selected_month1_str = datetime.strptime(selected_month1, '%Y-%m-%d').strftime('%Y-%m-%d')
        selected_month2_str = datetime.strptime(selected_month2, '%Y-%m-%d').strftime('%Y-%m-%d')

    
        print(identificador)
        print(selected_month1)
        print(selected_month2)

        if selected_month1 is None or selected_month2 is None:
            return jsonify({"error": "Los meses no pueden ser nulos"}), 400

        connection = connect(**config)
        cursor = connection.cursor()
        cursor.execute(f"SELECT peso_corporal, bicep_derecho, bicep_izquierdo, pecho, antebrazo_derecho, antebrazo_izquierdo, cintura, cadera, muslo_derecho, muslo_izquierdo, pantorrilla_derecha, pantorrilla_izquierda FROM medidas WHERE (MONTH(mes_registro) = MONTH('{selected_month1_str}') OR MONTH(mes_registro) = MONTH('{selected_month2_str}')) AND cedula = '{identificador}'")
        datos = cursor.fetchall()

        print(datos)

        return jsonify({'medidas': datos})

    except Exception as e:
        return jsonify({"error": str(e)})
 
@app.route('/medidas/<identificador>', methods=['GET'])
def medidas(identificador):
    try:
        connection = connect(**config)
        cursor = connection.cursor()
        sql=f"SELECT peso_corporal,pecho,cintura,cadera,bicep_izquierdo,bicep_derecho,antebrazo_izquierdo,antebrazo_derecho,muslo_izquierdo,muslo_derecho,pantorrilla_izquierda,pantorrilla_derecha FROM medidas WHERE cedula = '{identificador}';"
        cursor.execute(sql)
        datos = cursor.fetchall()
        
        if(datos):
            cursor.close()
            connection.close()
            return jsonify(datos)
        else:
            cursor.close()
            connection.close()
            return jsonify({"error":"notFound"})
    except Exception as e:
        return jsonify({"error": str(e)})
    

@app.route('/rutinas', methods=['GET'])
def rutinas():
    try:
        connection = connect(**config)
        cursor = connection.cursor()
        sql=f"SELECT nombre_ejercicio,repeciones,series,img FROM ejercicios WHERE contador_ejercicio = contador_ejercicio"
        cursor.execute(sql)
        datos = cursor.fetchall()
        
        if(datos):
            cursor.close()
            connection.close()
            return jsonify(datos)
        else:
            cursor.close()
            connection.close()
            return jsonify({"error":"notFound"})
    except Exception as e:
        return jsonify({"error": str(e)})
    

@app.route('/enviarCorreo/<correo>', methods=['POST'])
def enviarCorreo(correo):
    if request.method == 'POST':
       
        codigo_aleatorio = ''.join([str(random.randint(0, 9)) for _ in range(6)])
        
        asunto = 'Codigo de verificacion'

       
        cuerpo = f'Tu codigo es: {codigo_aleatorio}'

        email_emisor = 'cdvanegas830@misena.edu.co' 
        email_contrasena = 'vanegas2003'

        em = EmailMessage()
        em['From'] = email_emisor
        em['To'] = correo
        em['Subject'] = asunto
        em.set_content(cuerpo)

        
        contexto = ssl.create_default_context()

        try:
         
            with smtplib.SMTP_SSL('smtp.gmail.com', 465, context=contexto) as smtp:
                smtp.login(email_emisor, email_contrasena)
                smtp.sendmail(email_emisor, correo, em.as_string())
                
                connection = connect(**config)
                cursor = connection.cursor()
                cursor.execute(f"UPDATE registro_usuarios SET codigo = '{codigo_aleatorio}' WHERE correo = '{correo}'")
                connection.commit()
                cursor.close()
                
                return jsonify({"message": "Correo enviado correctamente"})

                
        except Exception as e:
            
            return jsonify({"error": str(e)})

        return mensaje
    else:
        return "Método no permitido"

@app.route("/verificarCodigo/<codigo>/<usuario>", methods=['get'])
def verificarCodigo(codigo, usuario):
    try:
        connection = connect(**config)
        cursor = connection.cursor()
        cursor.execute(f"SELECT codigo FROM registro_usuarios WHERE codigo = '{codigo}' AND correo = '{usuario}'")
        datos = cursor.fetchall()
        
        if(datos):
            cursor.close()
            connection.close()
            return jsonify({"message":"codigo coincide"})
        else:
            cursor.close()
            connection.close()
            return jsonify({"message":"codigo no coincide"})
    except Exception as e:
        return jsonify({"error": str(e)})



    
if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True, port=9501)