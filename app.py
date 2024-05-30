from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
# Configurando CORS para permitir requisições de qualquer origem
CORS(app, resources={r"/*": {"origins": "*"}})

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

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)
