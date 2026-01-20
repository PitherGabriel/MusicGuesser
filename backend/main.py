import requests
from flask import Flask, request, jsonify
from flask_cors import CORS


app = Flask(__name__)
CORS(app)  # Permite requests desde tu frontend


API_TOKEN ="8354c3bde2ee51720a962bb8fbf1a329"
url = "https://api.audd.io/"
files = {
    "file": open("AUDIO2.mp3", "rb")
}
data = {
    "api_token": API_TOKEN,
    "return": "apple_music,spotify"
}

@app.route('/api/song', methods=['GET'])
def get_inventory():
    """Obtener todo el inventario"""
    try:
        response = requests.post(url, data=data, files=files)
        result = response.json()
        return result
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True, port=5000)