from flask import Flask, request, jsonify
from keras.models import load_model
import numpy as np
from PIL import Image
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS to accept requests from frontend

model = load_model("cifar_model.h5")
classes = ['airplane','automobile','bird','cat','deer','dog','frog','horse','ship','truck']

@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    file = request.files['image']
    try:
        img = Image.open(file.stream).resize((32, 32))
        img = np.array(img) / 255.0
        img = img.reshape(1, 32, 32, 3)

        prediction = model.predict(img)
        class_index = np.argmax(prediction)
        confidence = float(prediction[0][class_index])

        return jsonify({
            "class": classes[class_index],
            "confidence": confidence
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
