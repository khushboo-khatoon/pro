import pandas as pd
import numpy as np

rows = []

for i in range(5000):

    age = int(np.clip(np.random.normal(50,15),20,85))
    total_chol = int(np.clip(np.random.normal(210,40),130,320))
    hdl = int(np.clip(np.random.normal(50,12),25,80))
    ldl = int(np.clip(np.random.normal(130,35),60,220))
    triglycerides = int(np.clip(np.random.normal(160,60),60,350))
    bp = int(np.clip(np.random.normal(130,20),90,200))
    heart_rate = int(np.clip(np.random.normal(75,12),50,120))

    ratio = round(total_chol / hdl,2)

    # Clinical risk score
    risk_score = (
        age * 0.3 +
        total_chol * 0.02 +
        bp * 0.04 +
        ldl * 0.02 -
        hdl * 0.03
    )

    risk = 0

    if risk_score > 30:
        risk = 1

    rows.append([
        age,
        total_chol,
        hdl,
        ldl,
        triglycerides,
        ratio,
        bp,
        heart_rate,
        risk_score,
        risk
    ])

columns = [
"age",
"total_cholesterol",
"hdl",
"ldl",
"triglycerides",
"chol_hdl_ratio",
"blood_pressure",
"heart_rate",
"risk_score",
"risk"
]

df = pd.DataFrame(rows, columns=columns)

df.to_csv("heart_attack_dataset_5000.csv", index=False)

print("Dataset generated")