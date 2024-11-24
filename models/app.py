from flask import Flask, render_template, request, jsonify
import os
import sys
from flask_cors import CORS
import numpy as np

# Add the parent directory to the Python path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from text_model.text_model1 import predict
from image_models.Brain_Stroke_CNN.predict import CNN_Model
# from models.image_models.brain_tumor_model.brain_tumor_flask import runner
# from models.image_models.brain_tumor_model.brain_tumor_flask import showPredictsById
from text_model.text_model2 import runner3


app = Flask(__name__)
CORS(app)

# @app.route('/')
# def home():
#     return render_template('landing.html')

# Returns the form page
# @app.route('/BrainStrokeForm')
# def BrainStrokeForm():
#     return render_template('BrainStrokeForm.html')

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
        
        # Extract each field from the data (with default values or error handling if missing)
        gender = int(data.get('gender'))  # Default to 0 if 'gender' is missing
        age = int(data.get('age'))  # Default to 0 if 'age' is missing
        hypertension = int(data.get('hypertension'))
        heart_disease = int(data.get('heart_disease'))
        ever_married = int(data.get('ever_married'))
        work_type = int(data.get('work_type'))
        residence_type = int(data.get('residence_type'))
        avg_glucose_level = float(data.get('avg_glucose_level'))
        bmi = float(data.get('bmi'))
        smoking_status = int(data.get('smoking_status'))
        
        # Prepare the data for prediction
        prediction = runner3([gender, age, hypertension, heart_disease, 
                              ever_married, work_type, residence_type, 
                              avg_glucose_level, bmi, smoking_status])

        # Return the result based on the prediction
        message = "Person is at risk of Brain Stroke" if prediction == 1 else "Person is not at risk of Brain Stroke"
        
        return jsonify({"prediction": message, "message": "Data received successfully!"}), 200

    except Exception as e:
        # Log the error for debugging
        print(f"Error occurred: {e}")
        return jsonify({"error": "Internal server error"}), 500

# Image Form
# @app.route('/BrainStrokeImageForm')
# def BrainStrokeImageForm():
#     return render_template('BrainStrokeImageForm.html')
    
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
    prediction = CNN_Model(image_path)  # Replace with your model's prediction logic

    # Convert prediction to a serializable type
    # if isinstance(prediction, np.int64):
    #     prediction = int(prediction)  # Convert to a standard Python int

    print(f"This is the {prediction}")
    return jsonify({"prediction": prediction})

# # Form file foe BrainTumor
# @app.route('/BrainTumorForm')
# def BrainTumorForm():
#     return render_template('/BrainTumorForm.html')

# @app.route('/BrainTumorUpload', methods=['POST'])
# def upload():
#     if 'image' not in request.files:
#         return jsonify({"error": "No images uploaded."}), 400

#     image_files = request.files.getlist('image')  # Get the list of uploaded files
#     uploaded_images = []

#     upload_folder = 'upload'
#     os.makedirs(upload_folder, exist_ok=True)  # Create folder if it doesn't exist

#     for image_file in image_files:
#         image_path = os.path.join(upload_folder, image_file.filename)
#         image_file.save(image_path)
#         uploaded_images.append(image_path)  # Store the path of the uploaded image

#     runner(uploaded_images[0],uploaded_images[1],uploaded_images[2])

#     im = ['upload/plots_bw.png','upload/plots_color.png']

#     return jsonify({"images": im})  # Return the relative paths


if __name__ == '__main__':
    app.run(debug=True)