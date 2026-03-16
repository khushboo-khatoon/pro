from flask import Flask, request, jsonify
from flask_cors import CORS
import easyocr
import cv2
import joblib
import os
import re
import uuid
import numpy as np

app = Flask(__name__)
CORS(app)

# -----------------------------
# Load ML model and scaler
# -----------------------------
MODEL_PATH = "heart_model.pkl"
SCALER_PATH = "scaler.pkl"

model = joblib.load(MODEL_PATH)
scaler = joblib.load(SCALER_PATH)

# OCR reader
reader = easyocr.Reader(['en'])

# Upload folder
UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

# -----------------------------
# Keywords for OCR detection
# -----------------------------
PARAM_KEYWORDS = {
    "cholesterol": ["CHOLESTEROL", "TOTAL"],
    "hdl": ["HDL", "HDL-C", "HDLDIRECT"],
    "ldl": ["LDL", "LDL-C"],
    "trig": ["TRIGLYCERIDE", "TRIGLYCERIDES", "TRIG"]
}

# -----------------------------
# Find value near keyword
# -----------------------------
def find_value(text, keywords):

    words = text.split()

    for i, word in enumerate(words):

        for key in keywords:

            if key in word:

                for j in range(i, min(i + 6, len(words))):

                    token = words[j]

                    if re.match(r'^\d+(\.\d+)?$', token):

                        return float(token)

    return None


# -----------------------------
# Health check
# -----------------------------
@app.route("/")
def home():

    return jsonify({"message": "Heart Risk Prediction API Running"})


# -----------------------------
# Image Upload + OCR Prediction
# -----------------------------
@app.route("/predict", methods=["POST"])
def predict():

    if "image" not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    file = request.files["image"]

    if file.filename == "":
        return jsonify({"error": "Empty file"}), 400

    filename = str(uuid.uuid4()) + ".jpg"
    path = os.path.join(app.config["UPLOAD_FOLDER"], filename)

    file.save(path)

    img = cv2.imread(path)

    if img is None:
        return jsonify({"error": "Invalid image"}), 400

    # Improve OCR preprocessing
    height, width = img.shape[:2]

    if width > 1200:
        scale = 1200 / width
        img = cv2.resize(img, None, fx=scale, fy=scale)

    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    gray = cv2.equalizeHist(gray)
    gray = cv2.GaussianBlur(gray, (3,3),0)

    result = reader.readtext(gray, detail=0)

    text = " ".join(result).upper()

    try:

        chol = find_value(text, PARAM_KEYWORDS["cholesterol"])
        hdl = find_value(text, PARAM_KEYWORDS["hdl"])
        ldl = find_value(text, PARAM_KEYWORDS["ldl"])
        trig = find_value(text, PARAM_KEYWORDS["trig"])

        age_match = re.search(r'(\d+)\s*Y', text)

        age = int(age_match.group(1)) if age_match else 50
        chol = chol if chol else 220
        hdl = hdl if hdl else 45
        ldl = ldl if ldl else 140
        trig = trig if trig else 180

        bp = 135
        hr = 85

        ratio = round(chol / hdl, 2) if hdl != 0 else 0

        sample = np.array([[age, chol, hdl, ldl, trig, ratio, bp, hr]])

        sample_scaled = scaler.transform(sample)

        prediction = model.predict(sample_scaled)
        probability = model.predict_proba(sample_scaled)

        risk = round(probability[0][1] * 100)
        risk = max(5, min(risk, 95))

        if risk < 30:
            level = "Low Risk"
        elif risk < 60:
            level = "Moderate Risk"
        else:
            level = "High Risk"

        result_text = "High Heart Risk" if prediction[0] == 1 else "Low Heart Risk"

        params = [chol, hdl, ldl, trig, age]
        filled = sum(1 for p in params if p)

        completeness = round((filled / 5) * 100)
        confidence = round((completeness * 0.7) + (risk * 0.3))

        return jsonify({

            "prediction": result_text,
            "risk": risk,
            "level": level,
            "confidence": confidence,
            "completeness": completeness,

            "parameters": {
                "age": age,
                "cholesterol": chol,
                "hdl": hdl,
                "ldl": ldl,
                "triglycerides": trig,
                "blood_pressure": bp,
                "heart_rate": hr
            }

        })

    except Exception as e:

        print("Prediction error:", e)

        return jsonify({

            "prediction": "Could not read report",
            "risk": 0,
            "level": "Unknown",
            "confidence": 0,
            "completeness": 0

        }), 500


# -----------------------------
# Manual Input Prediction
# -----------------------------
@app.route("/predict_manual", methods=["POST"])
def predict_manual():

    data = request.form

    age = int(data.get("age",50))
    chol = int(data.get("chol",220))
    hdl = int(data.get("hdl",45))
    ldl = int(data.get("ldl",140))
    trig = int(data.get("trig",180))
    bp = int(data.get("bp",135))
    hr = int(data.get("hr",85))

    ratio = round(chol / hdl, 2) if hdl != 0 else 0

    sample = np.array([[age, chol, hdl, ldl, trig, ratio, bp, hr]])

    sample_scaled = scaler.transform(sample)

    prediction = model.predict(sample_scaled)
    probability = model.predict_proba(sample_scaled)

    risk = round(probability[0][1] * 100)
    risk = max(5, min(risk, 95))

    if risk < 30:
        level = "Low Risk"
    elif risk < 60:
        level = "Moderate Risk"
    else:
        level = "High Risk"

    result_text = "High Heart Risk" if prediction[0] == 1 else "Low Heart Risk"

    completeness = 100
    confidence = round((completeness * 0.7) + (risk * 0.3))
    
    return jsonify({
    "prediction": result_text,
    "risk": risk,
    "level": level,
    "confidence": confidence,
    "completeness": completeness,

    "parameters":{
        "age": age,
        "chol": chol,
        "hdl": hdl,
        "ldl": ldl,
        "trig": trig,
        "bp": bp,
        "hr": hr
    }
})


# -----------------------------
# Start server
# -----------------------------
if __name__ == "__main__":
    app.run(debug=True)