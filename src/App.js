import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:5000";
  const [formData, setFormData] = useState({
    pregnancies: "",
    glucose: "",
    bloodPressure: "",
    skinThickness: "",
    insulin: "",
    bmi: "",
    diabetesPedigreeFunction: "",
    age: "",
  });

  const [result, setResult] = useState(null);
  const [showRemedies, setShowRemedies] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('diabetesAppTheme');
    return savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  const homeRemedies = [
    {
      title: "Cinnamon",
      description: "Helps improve insulin sensitivity and lower blood sugar levels",
      icon: "🌿"
    },
    {
      title: "Fenugreek Seeds",
      description: "Rich in soluble fiber, helps control blood sugar and cholesterol",
      icon: "🌱"
    },
    {
      title: "Bitter Gourd",
      description: "Contains compounds that help regulate blood glucose levels",
      icon: "🥒"
    },
    {
      title: "Regular Exercise",
      description: "30 minutes of daily physical activity improves insulin sensitivity",
      icon: "🏃‍♂️"
    },
    {
      title: "Adequate Sleep",
      description: "7-8 hours of quality sleep helps maintain healthy blood sugar levels",
      icon: "😴"
    }
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch(`${API_URL}/predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setResult(data.prediction || "Error occurred");
    } catch (error) {
      setResult("Error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleRemedies = () => {
    setShowRemedies(!showRemedies);
  };

  const toggleDarkMode = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem('diabetesAppTheme', newTheme ? 'dark' : 'light');
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <div className="header-content">
            <div className="logo">
              <span className="logo-icon">🩺</span>
              <h1>DiabetesCare</h1>
            </div>
            <button 
              className="theme-toggle"
              onClick={toggleDarkMode}
              aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
            >
              <span className="theme-icon">
                {isDarkMode ? '☀️' : '🌙'}
              </span>
            </button>
          </div>
          <p className="subtitle">AI-Powered Diabetes Prediction & Health Guidance</p>
        </header>

        <div className="main-content">
          <div className="form-container">
            <h2>Health Assessment</h2>
            <form onSubmit={handleSubmit} className="prediction-form">
              <div className="form-grid">
                {Object.keys(formData).map((key) => (
                  <div key={key} className="form-group">
                    <label className="form-label">
                      {key.replace(/([A-Z])/g, " $1").replace(/^\w/, c => c.toUpperCase())}
                    </label>
                    <input
                      type="number"
                      name={key}
                      value={formData[key]}
                      onChange={handleChange}
                      className="form-input"
                      placeholder={`Enter ${key.replace(/([A-Z])/g, " $1").toLowerCase()}`}
                      required
                    />
                  </div>
                ))}
              </div>
              <button type="submit" className="submit-btn" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <span className="spinner"></span>
                    Analyzing...
                  </>
                ) : (
                  <>
                    <span>🔍</span>
                    Predict Diabetes Risk
                  </>
                )}
              </button>
            </form>
          </div>

          {result && (
            <div className="result-section">
              <div className={`result-card ${result === "Diabetic" ? "diabetic" : "non-diabetic"}`}>
                <div className="result-icon">
                  {result === "Diabetic" ? "⚠️" : "✅"}
                </div>
                <div className="result-content">
                  <h3>Prediction Result</h3>
                  <p className="result-text">{result}</p>
                  {result === "Diabetic" && (
                    <button 
                      className="remedies-btn"
                      onClick={toggleRemedies}
                    >
                      <span>💡</span>
                      View Home Remedies
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {showRemedies && result === "Diabetic" && (
            <div className="remedies-section">
              <div className="remedies-header">
                <h3>💚 Natural Home Remedies</h3>
                <button className="close-btn" onClick={toggleRemedies}>×</button>
              </div>
              <div className="remedies-grid">
                {homeRemedies.map((remedy, index) => (
                  <div key={index} className="remedy-card" style={{animationDelay: `${index * 0.1}s`}}>
                    <div className="remedy-icon">{remedy.icon}</div>
                    <h4 className="remedy-title">{remedy.title}</h4>
                    <p className="remedy-description">{remedy.description}</p>
                  </div>
                ))}
              </div>
              <div className="remedies-footer">
                <p>⚠️ Always consult with a healthcare professional before trying new remedies</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
