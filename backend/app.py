from flask import Flask, request, jsonify
import numpy as np
import pickle
from flask_cors import CORS
import os

# Initialize app
app = Flask(__name__)
CORS(app)  # Allow React frontend to access this backend

# Load model and scaler
model = pickle.load(open("model.pkl", "rb"))
scaler = pickle.load(open("scaler.pkl", "rb"))

@app.route('/')
def home():
    return "Diabetes Prediction API is Running!"

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()

        # Extract input values in the correct order
        input_data = [
            data['pregnancies'],
            data['glucose'],
            data['bloodPressure'],
            data['skinThickness'],
            data['insulin'],
            data['bmi'],
            data['diabetesPedigreeFunction'],
            data['age']
        ]

        input_array = np.asarray(input_data).reshape(1, -1)
        std_data = scaler.transform(input_array)
        prediction = model.predict(std_data)

        result = 'Diabetic' if prediction[0] == 1 else 'Non-Diabetic'
        return jsonify({'prediction': result})

    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    host = os.environ.get('HOST', '0.0.0.0')
    port = int(os.environ.get('PORT', '5000'))
    debug = os.environ.get('FLASK_DEBUG', 'false').lower() == 'true'
    app.run(host=host, port=port, debug=debug)
