import joblib
import numpy as np

# Load the model and scaler
model = joblib.load('models/text_model/random_forest_model.pkl')
scaler = joblib.load('models/text_model/scaler.pkl')

def predict(data):
    # Preprocess data
    scaled_data = scaler.transform(np.array(data).reshape(1, -1))
    
    # Make prediction
    prediction = model.predict(scaled_data)
    return prediction

__all__ = ['predict']