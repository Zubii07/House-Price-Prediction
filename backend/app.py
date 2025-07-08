from flask import Flask, request, jsonify
import joblib
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # allow requests from frontend

# Load model and scaler
model = joblib.load("best_house_price_model.pkl")
scaler = joblib.load("scaler.pkl")

# IMPORTANT: Match the exact feature order used during training
feature_order = [
    'longitude', 'latitude', 'housing_median_age', 'total_rooms', 'total_bedrooms',
    'population', 'households', 'median_income',
    'ocean_proximity_<1H OCEAN', 'ocean_proximity_INLAND', 'ocean_proximity_ISLAND', 
    'ocean_proximity_NEAR BAY', 'ocean_proximity_NEAR OCEAN'
]

# Ocean proximity categories for the frontend
ocean_proximity_categories = ['<1H OCEAN', 'INLAND', 'ISLAND', 'NEAR BAY', 'NEAR OCEAN']

@app.route('/', methods=['GET'])
def home():
    return jsonify({
        "message": "House Price Prediction API",
        "endpoints": {
            "/predict": "POST - Predict house price",
            "/features": "GET - Get feature information"
        }
    })

@app.route('/features', methods=['GET'])
def get_features():
    """Return feature information for the frontend"""
    return jsonify({
        "features": {
            "longitude": {"type": "number", "description": "Longitude coordinate", "example": -122.23},
            "latitude": {"type": "number", "description": "Latitude coordinate", "example": 37.88},
            "housing_median_age": {"type": "number", "description": "Median age of houses", "example": 41},
            "total_rooms": {"type": "number", "description": "Total number of rooms", "example": 880},
            "total_bedrooms": {"type": "number", "description": "Total number of bedrooms", "example": 129},
            "population": {"type": "number", "description": "Population in the area", "example": 322},
            "households": {"type": "number", "description": "Number of households", "example": 126},
            "median_income": {"type": "number", "description": "Median income (in tens of thousands)", "example": 8.3252},
            "ocean_proximity": {"type": "select", "options": ocean_proximity_categories, "description": "Proximity to ocean"}
        }
    })

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        
        # Create input array with correct feature order
        input_features = []
        
        # Add numerical features
        numerical_features = ['longitude', 'latitude', 'housing_median_age', 'total_rooms', 
                            'total_bedrooms', 'population', 'households', 'median_income']
        
        for feature in numerical_features:
            value = data.get(feature, 0)
            input_features.append(float(value))
        
        # Handle ocean proximity one-hot encoding
        ocean_proximity = data.get('ocean_proximity', 'INLAND')
        for category in ocean_proximity_categories:
            if ocean_proximity == category:
                input_features.append(1)
            else:
                input_features.append(0)
        
        # Scale the input and make prediction
        scaled_input = scaler.transform([input_features])
        prediction = model.predict(scaled_input)[0]
        
        return jsonify({
            "predicted_price": round(prediction, 2),
            "formatted_price": f"${prediction:,.2f}",
            "input_features": dict(zip(feature_order, input_features))
        })
        
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    app.run()
