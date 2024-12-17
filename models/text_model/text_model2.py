import tensorflow as tf
import numpy as np
from sklearn.preprocessing import StandardScaler
import joblib

def MLP_Model(data):

    # Load the saved model
    model = tf.keras.models.load_model('models/text_model/best_stroke_mlp_model.h5')

    # Load the scaler if it was saved separately
    scaler = joblib.load('models/text_model/scaler2.pkl')
    model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])  # Update as necessary


    # Define a new sample (example)
    new_sample = np.array([data])  # Adjust with actual feature values

    # Scale the new sample using the same scaler
    new_sample_scaled = scaler.transform(new_sample)

    # Make a prediction
    prediction_logits = model.predict(new_sample_scaled)
    predicted_probability = tf.sigmoid(prediction_logits).numpy()[0][0]
    predicted_class = 1 if predicted_probability >= 0.5 else 0

    print(f"Predicted Probability: {predicted_probability:.4f}")
    print(f"Predicted Class: {predicted_class}")

    return int(predicted_class)

def RF_Model(data):
    model = joblib.load('models/text_model/random_forest_model.pkl')
    scaler = joblib.load('models/text_model/scaler.pkl')
    
    # Preprocess data
    scaled_data = scaler.transform(np.array(data).reshape(1, -1))
    
    # Make prediction
    prediction = model.predict(scaled_data)
    return prediction