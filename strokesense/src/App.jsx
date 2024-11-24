import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { Tubes } from './brain-tubes'; // Removed '.tsx' extension
import { BrainParticles } from './brain-particles'; // Removed '.tsx' extension
import { data } from './data';
import IntroSection from './components/mainPage'; // Removed '.tsx' extension
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FormPage from './components/formpage'; // Removed '.tsx' extension

// Function to create curves from the data
function createBrainCurvesFromPaths() {
  const paths = data.economics[0].paths;

  const brainCurves = [];
  paths.forEach(path => {
    const points = [];
    for (let i = 0; i < path.length; i += 3) {
      points.push(new THREE.Vector3(path[i], path[i + 1], path[i + 2]));
    }
    const tempCurve = new THREE.CatmullRomCurve3(points);
    brainCurves.push(tempCurve);
  });

  return brainCurves;
}

const curves = createBrainCurvesFromPaths();

// Custom CameraControls component that rotates the camera
function CameraControls() {
  const { camera } = useThree(); // Get the camera from the Three.js context

  useFrame(({ clock }) => {
    // Auto-rotate the camera
    camera.position.x = Math.sin(clock.getElapsedTime() * 0.3) * 2;
    camera.position.z = Math.cos(clock.getElapsedTime() * 0.3) * 2;
    camera.lookAt(0, 0, 0);  // Keep looking at the center
  });

  return null; // This component does not render anything
}

const App = () => {
  return (
    <Router>
      <div style={{ minHeight: '100vh', position: 'relative' }}>
        {/* Canvas placed behind all content, it will be on both the home page and form page */}
        <Canvas 
          camera={{ position: [0, 0, 0], near: 0.001, far: 5, fov: 10 }} 
          style={{
            position: 'fixed',  // Fix the canvas in place
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '100%', 
            zIndex: -1,  // Ensure the canvas is behind other content
            backgroundColor: 'transparent', // Transparent background
          }}
        >
          <color attach="background" args={['black']} />
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <Tubes curves={curves} />
          <BrainParticles curves={curves} />
          <OrbitControls enableZoom={false} />
          <CameraControls /> {/* Add the CameraControls component */}
        </Canvas>

        {/* Routes for different pages */}
        <Routes>
          <Route path="/" element={<IntroSection />} /> {/* Home Page */}
          <Route path="/form" element={<FormPage />} /> {/* Form Page */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
