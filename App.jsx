import React, { useState } from 'react';
import './App.css';

// HeroSection Component
const HeroSection = ({ onClick }) => {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1 className="title">Disease Symptom Tracker</h1>
        <p className="subtitle">
          Harnessing the power of AI to predict and prevent disease outbreaks in vulnerable populations.
        </p>
        <button className="cta-button" onClick={onClick}>
          Click here
        </button>
      </div>
    </section>
  );
};

// FeaturesSection Component
const FeaturesSection = () => {
  return (
    <section className="features-section">
      <h2 className="section-title">How AI Helps in Disease Outbreak Prediction</h2>
      <div className="features-container">
        <div className="feature-card">
          <h3>Real-Time Data Analysis</h3>
          <p>AI models analyze real-time data to predict outbreaks in vulnerable regions.</p>
        </div>
        <div className="feature-card">
          <h3>Accurate Predictions</h3>
          <p>AI can provide highly accurate predictions based on various parameters like climate, population, and health data.</p>
        </div>
        <div className="feature-card">
          <h3>Resource Allocation</h3>
          <p>AI helps in better resource allocation to mitigate the impact by anticipating outbreaks.</p>
        </div>
      </div>
    </section>
  );
};

// ImpactSection Component
const ImpactSection = () => {
  return (
    <section className="impact-section">
      <h2 className="section-title">Impact on Vulnerable Populations</h2>
      <p>
        AI has the potential to significantly reduce the impact of disease outbreaks on vulnerable populations. By using predictive analytics, we can ensure timely interventions, better healthcare access, and more efficient use of resources.
      </p>
      <ul>
        <li>Improved Healthcare Response</li>
        <li>Faster Emergency Interventions</li>
        <li>Better Awareness and Preparedness</li>
        <li>Targeted Public Health Measures</li>
      </ul>
    </section>
  );
};

// Health Information Form Component (Appen)
const Appen = () => {
  const [age, setAge] = useState(''); // Initial value of age is an empty string for manual entry
  const [symptoms, setSymptoms] = useState(''); // Selected or custom symptoms
  const [location, setLocation] = useState(''); // State for location
  const [customSymptom, setCustomSymptom] = useState(''); // State for custom symptom input

  // Predefined symptoms list for the dropdown
  const predefinedSymptoms = [
    'Cough',
    'Fever',
    'Fatigue',
    'Shortness of breath',
    'Headache',
    'Nausea',
    'Vomiting',
    'Chills',
    'Sore throat',
    'Diarrhea',
    'Body ache',
    'Loss of taste',
    'Loss of smell',
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalSymptoms = customSymptom || symptoms; // Use custom symptom if provided
    alert(`Age: ${age}\nSymptoms: ${finalSymptoms}\nLocation: ${location}`); // Corrected template literal syntax
    // Reset form fields
    setAge('');
    setSymptoms('');
    setLocation('');
    setCustomSymptom('');
  };

  return (
    <div className="form-container">
      <h1 className="form-title">Health Information Form</h1>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            placeholder="Enter your age"
            value={age}
            onChange={(e) => setAge(e.target.value)} // Allow manual input
            min="0"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="symptoms">Symptoms</label>
          <select
            id="symptoms"
            value={symptoms}
            onChange={(e) => {
              setSymptoms(e.target.value);
              setCustomSymptom(''); // Clear custom input if a predefined symptom is selected
            }}
          >
            <option value="">Select a symptom</option>
            {predefinedSymptoms.map((symptom, index) => (
              <option key={index} value={symptom}>
                {symptom}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="customSymptom">Or enter custom symptom</label>
          <input
            type="text"
            id="customSymptom"
            placeholder="Enter symptom"
            value={customSymptom}
            onChange={(e) => setCustomSymptom(e.target.value)}
            disabled={symptoms !== ''} // Disable custom input if a predefined symptom is selected
          />
        </div>

        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            placeholder="Enter your city or location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

// App Component (Main Component)
function App() {
  const [showForm, setShowForm] = useState(false);

  const handleClick = () => {
    setShowForm(true); // Switch to the form when the button is clicked
  };

  return (
    <div className="App">
      {!showForm ? (
        <>
          <HeroSection onClick={handleClick} />
          <FeaturesSection />
          <ImpactSection />
        </>
      ) : (
        <Appen />
      )}
    </div>
  );
}

export default App;
