from flask import Flask, request, jsonify
from flask_cors import CORS
import pymysql

app = Flask(__name__)
# Configurando CORS para permitir requisições de qualquer origem
CORS(app, resources={r"/*": {"origins": "*"}})
pymysql.install_as_MySQLdb()

import pandas as pd
mysql = pymysql.connect(
        host='localhost', 
        user='root', 
        password = "", 
        db='finease' 
        )

@app.route('/register-user', methods=['POST'])
def registerUser():
    try:
        user_data = request.get_json()

        email = user_data.get('email')
        nome = user_data.get('nome')
        senha = user_data.get('senha')

        if None in [email, nome, senha]:
            return jsonify({"error": "Missing information in the request"}), 400

        cur = mysql.cursor()
        cur.execute("INSERT INTO finease.usuarios (email, nome, senha) VALUES (%s, %s, %s)", 
                    (email, nome, senha))

        mysql.commit()
        cur.close()

        return jsonify({"message": "User registered successfully"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/add-gasto', methods=['POST'])
def addGasto():
    try:
        user_data = request.get_json()

        usuario_id = user_data.get('usuario_id')
        descricao = user_data.get('descricao')
        categoria = user_data.get('categoria')
        valor = user_data.get('valor')
        data_gasto = user_data.get('data_gasto')
        print(user_data)
        if None in [usuario_id, descricao, categoria, valor, data_gasto]:
            return jsonify({"error": "Missing information in the request"}), 400

        cur = mysql.cursor()
        cur.execute("INSERT INTO finease.gastos (usuario_id, descricao, categoria, valor, data_gasto) VALUES (%s, %s, %s, %s, %s)",
                    (int(usuario_id), descricao, categoria, float(valor), data_gasto))

        mysql.commit()
        cur.close()

        return jsonify({"message": "User registered successfully"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/api/login', methods=['POST'])
def login():
    print("FUNCIONOOOOOOOU")
    data = request.get_json()
    # print(data)
    username = data.get('username')
    password = data.get('password')
    print(username)
    # Lógica de autenticação fictícia
    if username == 'admin' and password == 'admin':
        response = {'message': 'Login bem-sucedido!'}
    else:
        response = {'message': 'Falha no login, verifique suas credenciais.'}

    return jsonify(response)

@app.route('/api/gastos/<int:usuario_id>', methods=['GET'])
def getGastos(usuario_id):
    try:
        cur = mysql.cursor(pymysql.cursors.DictCursor)
        cur.execute("SELECT * FROM finease.gastos WHERE usuario_id = %s", (usuario_id,))
        rows = cur.fetchall()
        cur.close()
        return jsonify(rows), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)
