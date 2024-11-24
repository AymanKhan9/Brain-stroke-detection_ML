import React from 'react';
import { Link } from 'react-router-dom';
import './mainPage.css'
import Navbar from './navbar.jsx';
import ischemic from '../assets/ischemic.png';
import hemorrhagic from '../assets/hemorrhagic.png';
import info1 from '../assets/info1.png';

const IntroSection = () => {
  return (
    <div>
      <Navbar />

      <section className="intro">
        <div className="intro-content">
          <div className="text-content">
            <h2>Understanding Brain Stroke</h2>
            <p>
			A brain stroke occurs when blood flow to a part of the brain is interrupted, leading to brain damage. This disruption can be caused by a blocked artery (ischemic stroke) or the rupture of a blood vessel (hemorrhagic stroke). Without proper blood flow, the affected area of the brain begins to lose oxygen and nutrients, resulting in damage to brain cells.
			<br/><br/>The severity of a stroke depends on how quickly it is detected and treated. Immediate medical attention is crucial, as it can significantly reduce the risk of long-term disability or death. Understanding the warning signs of a stroke and knowing how to act swiftly can help save lives.
            </p>
          </div>
          <div className="image-content">
            <img
              src={info1}
              alt="Brain Stroke Information"
              className="info-image"
            />
          </div>
        </div>
      </section>

      {/* Info Boxes */}
      <div className="info-boxes">
        <div className="info-box">
          <h3>Recognizing the Symptoms</h3>
          <ul>
            <li>
              <strong>Face Drooping:</strong> One side of the face may droop or
              feel numb
            </li>
            <li>
              <strong>Arm Weakness:</strong> One arm may be weak or numb
            </li>
            <li>
              <strong>Speech Difficulty:</strong> The person may have slurred
              speech
            </li>
            <li>
              <strong>Time to Call Emergency Services:</strong> If any of these
              symptoms appear
            </li>
          </ul>
        </div>
        <div className="info-box">
          <h3>Preventing a Stroke</h3>
          <ul>
            <li>
              <strong>Healthy Diet:</strong> Low in salt, fats, and
              cholesterol
            </li>
            <li>
              <strong>Regular Exercise:</strong> To improve heart health
            </li>
            <li>
              <strong>Avoid Smoking:</strong> Smoking increases stroke risk
            </li>
            <li>
              <strong>Control Blood Pressure:</strong> Keep blood pressure
              within a healthy range
            </li>
          </ul>
        </div>
      </div>

      <div className="stroke-types" id="stroke-types">
        <h3>Types of Brain Stroke</h3>
        <div className="stroke-type">
          <div className="stroke-box">
            <div className="stroke-text">
              <h4>Ischemic Stroke</h4>
              <p>
                An ischemic stroke occurs when a blood clot blocks or narrows an
                artery leading to the brain, causing a decrease in blood flow.
                <br />
                <br />
                This blockage can be caused by various factors, including
                atherosclerosis (the buildup of fatty deposits inside blood
                vessels), embolism (a clot or other material that travels from
                another part of the body to the brain), or thrombosis (a clot
                that forms in the brain's blood vessels).{' '}
              </p>
            </div>
            <div className="stroke-image">
              <img src={ischemic} alt="Ischemic Stroke" />
            </div>
          </div>

          <div className="stroke-box" style={{ marginBottom: '50px' }}>
            <div className="stroke-image">
              <img src={hemorrhagic} alt="Hemorrhagic Stroke" />
            </div>
            <div className="stroke-text">
              <h4>Hemorrhagic Stroke</h4>
              <p>
                A hemorrhagic stroke occurs when a blood vessel in the brain
                ruptures, leading to bleeding (hemorrhage) and pressure on brain
                tissue.
                <br />
                <br />
                This condition can result in serious damage to brain cells and
                disrupt normal brain functions. Hemorrhagic strokes can be
                caused by various factors, including high blood pressure,
                aneurysms, and arteriovenous malformations (AVMs).{' '}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* New Info Box: "Take test for brain stroke prediction" */}
      <div className="intro">
        <h3>Take a Test for Brain Stroke Prediction</h3>
        <p>
		Did you know that early detection of stroke can reduce the severity of its effects? Take the test now to understand your risk.
          <br />
          <Link to="/form" style={{ color: '#007BFF' }}>
            Click here to take the test
          </Link>
        </p>
      </div>
    </div>
  );
};

export default IntroSection;
