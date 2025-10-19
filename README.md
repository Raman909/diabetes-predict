Diabetes Prediction Web App

A simple web-based application built using React.js and Flask (Python) that predicts whether a person is diabetic or non-diabetic based on eight health parameters.
The model uses a trained Machine Learning algorithm to analyze user input and provide instant predictions.

🚀 Features

User-friendly web interface for entering health metrics

Real-time diabetes prediction using an ML model

Displays helpful home remedies for diabetic users

Light/Dark theme toggle


🛠️ How to Run
1️⃣ Backend (Flask)
# Go to backend folder
cd backend

# Install dependencies
pip install flask flask-cors numpy pickle-mixin scikit-learn

# Run the Flask server
python app.py

2️⃣ Frontend (React)
# Go to frontend folder
cd frontend

# Install dependencies
npm install

# Start the React app
npm start


App will run on:
🔗 Frontend: http://localhost:3000
🔗 Backend: http://127.0.0.1:5000

🧩 Tech Stack

Frontend: React.js

Backend: Flask (Python)

ML Model: Scikit-learn

Styling: CSS

📜 Description

This project integrates a Machine Learning model with a React.js frontend using Flask API.
Users input eight health parameters, and the model predicts whether they are diabetic or not — providing a smooth and interactive experience.
