import pandas as pd

data = pd.read_csv("heart_attack_dataset_5000.csv")
print(data.isnull().sum())
print(data.head())