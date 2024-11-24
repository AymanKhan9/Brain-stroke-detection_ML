import React from 'react';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div>
      <style>{`
        :root {
          --accent-color: #007BFF;
          font-family: sans-serif;
        }

        /* Prevent the navbar from overflowing horizontally */
        .navbar {
          position: sticky;
          top: 0;
          width: 100%;
          max-width: 100vw; /* Ensure it doesn't extend beyond the viewport */
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 2rem;
          background-color: rgba(0, 0, 0, 0.7);  /* Dark semi-transparent background */
          color: white;  /* Light text for contrast */
          border-bottom: 2px solid rgba(255, 255, 255, 0.3);  /* Lighter border for contrast */
          z-index: 1000;
          box-sizing: border-box; /* Include padding in width calculation */
          overflow: hidden; /* Prevent any overflow */
        }

        .logo-container {
          display: flex;
          align-items: center;
        }

        .logo {
          height: 40px;
          margin-right: 1rem;
        }

        .navbar h1 {
          margin: 0;
          font-size: 1.8rem;
          color: white; /* Light color for title */
          font-family: 'Arial', sans-serif;
        }

        .nav-links {
          display: flex;
          margin: 0;
          padding: 0;
          list-style: none;
        }

        .nav-links li {
          margin-left: 2rem;
        }

        .nav-links a {
          text-decoration: none;
          color: #fff;  /* White text for links */
          font-size: 1.1rem;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          transition: background-color 0.3s ease;
        }

        .nav-links a:hover {
          background-color: var(--accent-color);
          color: white;
        }

        @media (max-width: 768px) {
          .navbar {
            padding: 1rem;
            flex-direction: column;
            text-align: center;
          }

          .logo-container {
            margin-bottom: 1rem;
          }

          .nav-links {
            flex-direction: column;
          }

          .nav-links li {
            margin: 0.5rem 0;
          }
        }
      `}</style>
      <nav className="navbar">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
          <Link to="http://localhost:3000/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <h1>StrokeSense</h1>
          </Link>
        </div>
        <ul className="nav-links">
          <li><a href="http://localhost:3000/">Home</a></li>
          <li><a href="http://localhost:3000/#stroke-types">Types</a></li>
          <li><a href="http://localhost:3000/form">Take Test</a></li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
