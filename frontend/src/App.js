import React, { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

function App() {
  const [formData, setFormData] = useState({
    longitude: '',
    latitude: '',
    housing_median_age: '',
    total_rooms: '',
    total_bedrooms: '',
    population: '',
    households: '',
    median_income: '',
    ocean_proximity: 'INLAND'
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const oceanProximityOptions = [
    '<1H OCEAN',
    'INLAND', 
    'ISLAND',
    'NEAR BAY',
    'NEAR OCEAN'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setPrediction(null);

    try {
      // Convert string values to numbers for numerical fields
      const processedData = {
        longitude: parseFloat(formData.longitude),
        latitude: parseFloat(formData.latitude),
        housing_median_age: parseFloat(formData.housing_median_age),
        total_rooms: parseFloat(formData.total_rooms),
        total_bedrooms: parseFloat(formData.total_bedrooms),
        population: parseFloat(formData.population),
        households: parseFloat(formData.households),
        median_income: parseFloat(formData.median_income),
        ocean_proximity: formData.ocean_proximity
      };

      const response = await axios.post(`${API_BASE_URL}/predict`, processedData);
      setPrediction(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred while predicting the price');
    } finally {
      setLoading(false);
    }
  };

  const loadSampleData = () => {
    setFormData({
      longitude: '-122.23',
      latitude: '37.88',
      housing_median_age: '41',
      total_rooms: '880',
      total_bedrooms: '129',
      population: '322',
      households: '126',
      median_income: '8.3252',
      ocean_proximity: 'NEAR BAY'
    });
  };

  return (
    <div className="container">
      <div className="header">
        <h1>🏠 House Price Predictor</h1>
        <p>Get accurate house price predictions using machine learning</p>
      </div>

      <form className="prediction-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="longitude">Longitude</label>
            <small className="field-description">Geographic coordinate (horizontal) — west-east location in California</small>
            <input
              type="number"
              step="any"
              id="longitude"
              name="longitude"
              value={formData.longitude}
              onChange={handleInputChange}
              placeholder="e.g., -122.23"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="latitude">Latitude</label>
            <small className="field-description">Geographic coordinate (vertical) — north-south location</small>
            <input
              type="number"
              step="any"
              id="latitude"
              name="latitude"
              value={formData.latitude}
              onChange={handleInputChange}
              placeholder="e.g., 37.88"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="housing_median_age">Housing Median Age</label>
            <small className="field-description">Median age of houses in the block group (in years)</small>
            <input
              type="number"
              id="housing_median_age"
              name="housing_median_age"
              value={formData.housing_median_age}
              onChange={handleInputChange}
              placeholder="e.g., 41"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="total_rooms">Total Rooms</label>
            <small className="field-description">Total number of rooms in all houses in the block</small>
            <input
              type="number"
              id="total_rooms"
              name="total_rooms"
              value={formData.total_rooms}
              onChange={handleInputChange}
              placeholder="e.g., 880"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="total_bedrooms">Total Bedrooms</label>
            <small className="field-description">Total number of bedrooms in all houses in the block</small>
            <input
              type="number"
              id="total_bedrooms"
              name="total_bedrooms"
              value={formData.total_bedrooms}
              onChange={handleInputChange}
              placeholder="e.g., 129"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="population">Population</label>
            <small className="field-description">Number of people living in that block</small>
            <input
              type="number"
              id="population"
              name="population"
              value={formData.population}
              onChange={handleInputChange}
              placeholder="e.g., 322"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="households">Households</label>
            <small className="field-description">Number of households (families/units) in the block</small>
            <input
              type="number"
              id="households"
              name="households"
              value={formData.households}
              onChange={handleInputChange}
              placeholder="e.g., 126"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="median_income">Median Income (in $10k)</label>
            <small className="field-description">Median income in units of $10,000 (e.g., 8.3 = $83,000)</small>
            <input
              type="number"
              step="any"
              id="median_income"
              name="median_income"
              value={formData.median_income}
              onChange={handleInputChange}
              placeholder="e.g., 8.3252"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="ocean_proximity">Ocean Proximity</label>
            <small className="field-description">Categorical feature — how close the area is to the ocean</small>
            <select
              id="ocean_proximity"
              name="ocean_proximity"
              value={formData.ocean_proximity}
              onChange={handleInputChange}
              required
            >
              {oceanProximityOptions.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div style={{ marginBottom: '20px', textAlign: 'center' }}>
          <button
            type="button"
            onClick={loadSampleData}
            style={{
              background: 'transparent',
              border: '2px solid #667eea',
              color: '#667eea',
              padding: '8px 16px',
              borderRadius: '6px',
              cursor: 'pointer',
              marginRight: '10px'
            }}
          >
            Load Sample Data
          </button>
        </div>

        <button 
          type="submit" 
          className="predict-button" 
          disabled={loading}
        >
          {loading ? (
            <div className="loading">
              <div className="spinner"></div>
              Predicting...
            </div>
          ) : (
            'Predict House Price'
          )}
        </button>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
      </form>

      {prediction && (
        <div className="result-card">
          <h2>Predicted House Price</h2>
          <div className="predicted-price">
            {prediction.formatted_price}
          </div>
          <p className="price-note">
            Based on the provided property characteristics
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
