import React, { useState } from 'react';
import Navbar from './navbar';

const ImageForm = () => {
  const [prediction, setPrediction] = useState(null); // To store prediction result
  const [isFormSubmitted, setIsFormSubmitted] = useState(false); // To control form submission state
  const [image, setImage] = useState(null); // To store the selected image file

  // Handle file input change
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      alert('Please select an image before submitting.');
      return;
    }

    setIsFormSubmitted(true); // Indicate form submission

    const formData = new FormData();
    formData.append('image', image); // Append the image file to the formData

    try {
      const response = await fetch('http://127.0.0.1:5000/BrainStrokeImageResult', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      console.log(data);

      let resultText = '';
      if (data.prediction === 0) {
        resultText = 'Hemorrhagic';
      } else if (data.prediction === 1) {
        resultText = 'Ischaemic';
      }

      setPrediction(resultText); // Store the prediction result
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while submitting the form.');
    } finally {
      setIsFormSubmitted(false); // Reset form submission state
    }
  };

  return (
    <div>
      <Navbar />
      <div className="form-container">
        <style>{`
          /* Form container */
          .form-container {
            background-color: rgba(33, 33, 33, 0.9);
            color: #fff;
            padding: 2rem;
            max-width: 40vw;
            margin: 5dvh auto;
            border-radius: 10px;
            box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
            text-align: center;
            font-family: sans-serif;
          }

          /* Form title */
          .form-title {
            font-size: 1.8rem;
            font-weight: 600;
            margin-bottom: 1.5rem;
            color: #007BFF;
            margin-top: 0;
          }

          /* Form styling */
          .form {
            display: grid;
            gap: 1.5rem;
          }

          /* Form group (for labels and inputs) */
          .form-group {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
          }

          /* Label styling */
          .form-label {
            font-size: 1.1rem;
            font-weight: 500;
            color: #fff;
            margin-bottom: 5px;
          }

          /* Input styling */
          .form-input {
            padding: 10px;
            border-radius: 6px;
            border: 1px solid #ddd;
            font-size: 0.9rem;
            width: 100%;
            box-sizing: border-box;
            background-color: #121212;
            color: white;
          }

          /* Submit button */
          .form-button {
            padding: 12px 20px;
            background-color: #0055b1;
            color: white;
            border: none;
            border-radius: 6px;
            font-size: 16px;
            cursor: pointer;
            width: 100%;
          }

          .form-button:hover {
            background-color: #004289;
          }

          /* Result section */
          .result {
            margin-top: 2rem;
            font-size: 18px;
            font-weight: 600;
            color: #fff;
          }

          .result a {
            color: #007bff;
            text-decoration: none;
          }

          .result a:hover {
            text-decoration: underline;
          }
        `}</style>

        <h1 className="form-title">Upload CT Scan Image</h1>
        
        {!isFormSubmitted && !prediction && (
          <form onSubmit={handleSubmit} encType="multipart/form-data" className="form">
            <div className="form-group">
              <label htmlFor="image_upload" className="form-label">Upload Image:</label>
              <input
                type="file"
				id="image_upload"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                required
                className="form-input"
              />
            </div>
            <button type="submit" className="form-button">Upload</button>
          </form>
        )}

        {isFormSubmitted && !prediction && (
          <div>Loading...</div> // Display loading while waiting for response
        )}

        {prediction && (
          <div className="result">
            <p>Prediction Result: {prediction}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageForm;
