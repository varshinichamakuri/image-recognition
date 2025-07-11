import React, { useState } from 'react';
import './App.css';

function App() {
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [result, setResult] = useState(null);

  const handleUpload = async () => {
    if (!file) return alert("Please select a file.");
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Prediction failed:', error);
    }
  };

  return (
    <div className="container">
      {/* Navbar */}
      <nav className="navbar">
        <a href="#about">About</a>
        <a href="#check">Check Image</a>
      </nav>

      {/* About Section */}
      <section id="about" className="section-box">
        <h1>🌿 Image Recognition App</h1>
        <p>This web app allows you to upload an image and receive predictions using a CIFAR-10 trained deep learning model.</p>
        <h2>🧠 About CIFAR-10 Dataset</h2>
        <p>
          CIFAR-10 is a dataset of 60,000 32×32 color images in 10 classes, with 6,000 images per class. It's commonly used
          for training machine learning and computer vision algorithms.
        </p>
        <p>
          The 10 classes are: airplane, automobile, bird, cat, deer, dog, frog, horse, ship, and truck.
        </p>
      </section>

      {/* Prediction Section */}
      <section id="check" className="section-box">
        <h2>📸 Check an Image</h2>
        <p>Upload an image and get prediction from the AI model:</p>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const selected = e.target.files[0];
            setFile(selected);
            setImagePreview(URL.createObjectURL(selected));
          }}
        />

        {imagePreview && (
          <img src={imagePreview} alt="preview" className="image-preview" />
        )}

        <button onClick={handleUpload}>🔍 Predict Image</button>

        {result && (
          <div className="result-box">
            <p><strong>📚 Class:</strong> {result.class}</p>
            <p><strong>📊 Confidence:</strong> {result.confidence.toFixed(2)}%</p>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer>
        <p>Made with 💚 using React + Flask + TensorFlow</p>
      </footer>
    </div>
  );
}

export default App;
