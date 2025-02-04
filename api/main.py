from fastapi import FastAPI
from pydantic import BaseModel
import pandas as pd
from autogluon.tabular import TabularPredictor
import os


app = FastAPI()

class ModelInput(BaseModel):
    OverallQual: float
    GrLivArea: float
    TotalBsmtSF: float
    BsmtFinSF1: float
    FirstFlrSF: float  # Renamed to be a valid Python variable
    GarageCars: float
    SecondFlrSF: float  # Renamed for valid syntax
    LotArea: float
    OverallCond: float
    GarageArea: float
    YearBuilt: float

# Try both possible locations
possible_paths = [
    "/app/back/AutogluonModels/ag-20250203_201739",  
    "/app/AutogluonModels/ag-20250203_201739", 
]

# Find the correct model path
for path in possible_paths:
    if os.path.exists(os.path.join(path, "")):
        pathPredictor = path
        break
else:
    raise FileNotFoundError("Model not found in expected locations.")

print(f"Loading model from: {pathPredictor}")
predictor = TabularPredictor.load(pathPredictor, require_version_match=False)


@app.post("/predict")
def predict(input_data: ModelInput):
    input_df = pd.DataFrame([input_data.dict()])
    prediction = predictor.predict(input_df)
    return {"prediction": prediction.tolist()}


