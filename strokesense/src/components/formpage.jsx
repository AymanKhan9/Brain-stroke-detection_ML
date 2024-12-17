import React, { useState } from 'react';
import Navbar from './navbar';

const FormPage = () => {
  const [formData, setFormData] = useState({
    gender: '',
    age: '',
    hypertension: '',
    heart_disease: '',
    ever_married: '',
    work_type: '',
    residence_type: '',
    avg_glucose_level: '',
    bmi: '',
    smoking_status: '',
  });
  const [prediction, setPrediction] = useState(null); // To store prediction result
  const [isFormSubmitted, setIsFormSubmitted] = useState(false); // To control form submission state

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsFormSubmitted(true); // Indicate form has been submitted

    // Create FormData object
    const form = new FormData();
    Object.keys(formData).forEach((key) => {
      form.append(key, formData[key]);
    });

    try {
      console.log(form);
      const response = await fetch('http://127.0.0.1:5000/BrainStrokePredict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
      },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log(data);

      setPrediction(data.prediction); // Store prediction result

    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while submitting the form.');
      setIsFormSubmitted(false); // Reset form submission state if error occurs
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
      {!isFormSubmitted ? <h2 className="form-title">Health Data Input</h2> : <></>}
      {!isFormSubmitted ? (
        <form className="form" onSubmit={handleSubmit}>
          {/* Gender */}
          <div className="form-group">
            <label htmlFor="gender" className="form-label">
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className="form-input"
            >
              <option value="">Select...</option>
              <option value="0">Male</option>
              <option value="1">Female</option>
              <option value="2">Other</option>
            </select>
          </div>

          {/* Age */}
          <div className="form-group">
            <label htmlFor="age" className="form-label">
              Age
            </label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
              min="0"
              className="form-input"
            />
          </div>

          {/* Hypertension */}
          <div className="form-group">
            <label htmlFor="hypertension" className="form-label">
              Hypertension
            </label>
            <select
              id="hypertension"
              name="hypertension"
              value={formData.hypertension}
              onChange={handleChange}
              required
              className="form-input"
            >
              <option value="">Select...</option>
              <option value="0">No</option>
              <option value="1">Yes</option>
            </select>
          </div>

          {/* Heart Disease */}
          <div className="form-group">
            <label htmlFor="heart_disease" className="form-label">
              Heart Disease
            </label>
            <select
              id="heart_disease"
              name="heart_disease"
              value={formData.heart_disease}
              onChange={handleChange}
              required
              className="form-input"
            >
              <option value="">Select...</option>
              <option value="0">No</option>
              <option value="1">Yes</option>
            </select>
          </div>

          {/* Ever Married */}
          <div className="form-group">
            <label htmlFor="ever_married" className="form-label">
              Ever Married
            </label>
            <select
              id="ever_married"
              name="ever_married"
              value={formData.ever_married}
              onChange={handleChange}
              required
              className="form-input"
            >
              <option value="">Select...</option>
              <option value="0">No</option>
              <option value="1">Yes</option>
            </select>
          </div>

          {/* Work Type */}
          <div className="form-group">
            <label htmlFor="work_type" className="form-label">
              Work Type
            </label>
            <select
              id="work_type"
              name="work_type"
              value={formData.work_type}
              onChange={handleChange}
              required
              className="form-input"
            >
              <option value="">Select...</option>
              <option value="0">Private</option>
              <option value="1">Government</option>
              <option value="2">Self-employed</option>
              <option value="3">Children</option>
              <option value="4">Never Worked</option>
            </select>
          </div>

          {/* Residence Type */}
          <div className="form-group">
            <label htmlFor="residence_type" className="form-label">
              Residence Type
            </label>
            <select
              id="residence_type"
              name="residence_type"
              value={formData.residence_type}
              onChange={handleChange}
              required
              className="form-input"
            >
              <option value="">Select...</option>
              <option value="1">Urban</option>
              <option value="0">Rural</option>
            </select>
          </div>

          {/* Average Glucose Level */}
          <div className="form-group">
            <label htmlFor="avg_glucose_level" className="form-label">
              Average Glucose Level
            </label>
            <input
              type="number"
              id="avg_glucose_level"
              name="avg_glucose_level"
              value={formData.avg_glucose_level}
              onChange={handleChange}
              required
              step="0.01"
              min="0"
              className="form-input"
            />
          </div>

          {/* BMI */}
          <div className="form-group">
            <label htmlFor="bmi" className="form-label">
              BMI
            </label>
            <input
              type="number"
              id="bmi"
              name="bmi"
              value={formData.bmi}
              onChange={handleChange}
              required
              step="0.01"
              min="0"
              className="form-input"
            />
          </div>

          {/* Smoking Status */}
          <div className="form-group">
            <label htmlFor="smoking_status" className="form-label">
              Smoking Status
            </label>
            <select
              id="smoking_status"
              name="smoking_status"
              value={formData.smoking_status}
              onChange={handleChange}
              required
              className="form-input"
            >
              <option value="">Select...</option>
              <option value="0">Never Smoked</option>
              <option value="1">Smokes</option>
              <option value="2">Formerly Smoked</option>
            </select>
          </div>

          <button type="submit" className="form-button">
            Submit
          </button>
        </form>
      ) : (
        <div className="result">
          <h2>Prediction Result</h2>
          <p>{prediction}</p>
          {
            prediction === 'Person is at risk of Brain Stroke' ?
            <button type="submit" className="form-button" onClick={() => window.location.href = '/Imageform'}>
            Upload CT-Scan
          </button>
          : <></>
          }
        </div>
      )}
    </div>
	</div>
  );
};

export default FormPage;
