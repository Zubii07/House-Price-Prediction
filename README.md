# House Price Prediction API & Frontend

A complete Flask API and React frontend application for predicting house prices using machine learning.

## Project Structure

```
├── app.py                 # Flask API server
├── best_house_price_model.pkl  # Trained ML model
├── scaler.pkl            # Feature scaler
├── requirements.txt      # Python dependencies
├── housing.csv          # Dataset
├── main.ipynb           # Jupyter notebook with model training
└── frontend/            # React frontend application
    ├── package.json
    ├── public/
    └── src/
```

## Features

- **Flask REST API** with CORS support
- **Machine Learning Model** trained on California housing data
- **React Frontend** with modern UI
- **Real-time Predictions** based on user input
- **Input Validation** and error handling
- **Responsive Design** for mobile and desktop

## Setup Instructions

### Backend (Flask API)

1. **Install Python dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

2. **Run the Flask server:**
   ```bash
   python app.py
   ```
   
   The API will be available at `http://localhost:5000`

### Frontend (React App)

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install Node.js dependencies:**
   ```bash
   npm install
   ```

3. **Start the React development server:**
   ```bash
   npm start
   ```
   
   The frontend will be available at `http://localhost:3000`

## API Endpoints

- `GET /` - API information
- `GET /features` - Get feature information and examples
- `POST /predict` - Predict house price

### Example API Request

```bash
curl -X POST http://localhost:5000/predict \
  -H "Content-Type: application/json" \
  -d '{
    "longitude": -122.23,
    "latitude": 37.88,
    "housing_median_age": 41,
    "total_rooms": 880,
    "total_bedrooms": 129,
    "population": 322,
    "households": 126,
    "median_income": 8.3252,
    "ocean_proximity": "NEAR BAY"
  }'
```

### Example API Response

```json
{
  "predicted_price": 452600.0,
  "formatted_price": "$452,600.00",
  "input_features": {
    "longitude": -122.23,
    "latitude": 37.88,
    ...
  }
}
```

## Input Features

- **longitude**: Longitude coordinate
- **latitude**: Latitude coordinate  
- **housing_median_age**: Median age of houses in the block
- **total_rooms**: Total number of rooms in the block
- **total_bedrooms**: Total number of bedrooms in the block
- **population**: Population of the block
- **households**: Number of households in the block
- **median_income**: Median income of households (in tens of thousands)
- **ocean_proximity**: Proximity to ocean (categories: '<1H OCEAN', 'INLAND', 'ISLAND', 'NEAR BAY', 'NEAR OCEAN')

## Model Information

- **Algorithm**: Random Forest Regressor
- **Features**: 13 features (8 numerical + 5 one-hot encoded categorical)
- **Performance**: ~81.7% R² score
- **Preprocessing**: StandardScaler for feature normalization

## Usage

1. Start both the Flask API and React frontend
2. Open `http://localhost:3000` in your browser
3. Fill in the house characteristics
4. Click "Predict House Price" to get the prediction
5. Use "Load Sample Data" to quickly test with example values

## Technologies Used

- **Backend**: Flask, scikit-learn, pandas, numpy
- **Frontend**: React, Axios, CSS3
- **ML**: Random Forest, StandardScaler
- **Data**: California Housing Dataset

