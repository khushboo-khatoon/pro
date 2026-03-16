import joblib

model = joblib.load("heart_model.pkl")
scaler = joblib.load("scaler.pkl")

sample = [[65,1,160,250,110]]

sample_scaled = scaler.transform(sample)

print(model.predict(sample_scaled))
print(model.predict_proba(sample_scaled))