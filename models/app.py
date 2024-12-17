from flask import Flask, jsonify
import os
import sys
from flask_cors import CORS

# Add the parent directory to the Python path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from image_models.Brain_Stroke_CNN.predict import CNN_Model
# from text_model.text_model2 import MLP_Model as text_predict
from text_model.model import predict


app = Flask(__name__)
CORS(app)

# Form submit button calls this
from flask import Flask, request, jsonify

@app.route('/BrainStrokePredict', methods=['POST'])
def BrainStrokePredict():
    try:
        # Extract data from the JSON request
        data = request.get_json()
        print(f"\n\n {data} \n\n")
        
        # Ensure the data is not None
        if data is None:
            return jsonify({"error": "No data provided"}), 400
        
        gender = int(data.get('gender'))
        age = int(data.get('age'))
        hypertension = int(data.get('hypertension'))
        heart_disease = int(data.get('heart_disease'))
        ever_married = int(data.get('ever_married'))
        work_type = int(data.get('work_type'))
        residence_type = int(data.get('residence_type'))
        avg_glucose_level = float(data.get('avg_glucose_level'))
        bmi = float(data.get('bmi'))
        smoking_status = int(data.get('smoking_status'))

        # Prepare the data for prediction
        prediction = predict([gender, age, hypertension, heart_disease, ever_married, 
                                   work_type, residence_type,avg_glucose_level, bmi, smoking_status])

        # Return the result based on the prediction
        message = "Person is at risk of Brain Stroke" if prediction == 1 else "Person is not at risk of Brain Stroke"
        
        return jsonify({"prediction": message, "message": "Data received successfully!"}), 200

    except Exception as e:
        # Log the error for debugging
        print(f"Error occurred: {e}")
        return jsonify({"error": "Internal server error"}), 500
    
# API called for prediction
@app.route('/BrainStrokeImageResult', methods=['POST'])
def BrainStrokeImageResult():
    if 'image' not in request.files:
        return jsonify({"prediction": "No image uploaded."}), 400

    image_file = request.files['image']
    
    # Save the image to the 'upload' folder
    upload_folder = 'upload'
    os.makedirs(upload_folder, exist_ok=True)  # Create folder if it doesn't exist
    image_path = os.path.join(upload_folder, image_file.filename)
    image_file.save(image_path)

    # Process the image and make a prediction
    prediction = CNN_Model(image_path)

    print(f"This is the {prediction}")
    return jsonify({"prediction": prediction})

if __name__ == '__main__':
    app.run(debug=False)