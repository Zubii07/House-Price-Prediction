import requests
import json

# API base URL
BASE_URL = "http://localhost:5000"

def test_api():
    """Test the Flask API endpoints"""
    
    print("🧪 Testing House Price Prediction API\n")
    
    # Test 1: Check if API is running
    try:
        response = requests.get(f"{BASE_URL}/")
        print("✅ API is running!")
        print(f"Response: {response.json()}\n")
    except requests.exceptions.ConnectionError:
        print("❌ API is not running. Please start the Flask server first.")
        return
    
    # Test 2: Get features information
    try:
        response = requests.get(f"{BASE_URL}/features")
        print("✅ Features endpoint working!")
        features = response.json()["features"]
        print(f"Available features: {list(features.keys())}\n")
    except Exception as e:
        print(f"❌ Features endpoint error: {e}\n")
    
    # Test 3: Make a prediction with sample data
    sample_data = {
        "longitude": -122.23,
        "latitude": 37.88,
        "housing_median_age": 41,
        "total_rooms": 880,
        "total_bedrooms": 129,
        "population": 322,
        "households": 126,
        "median_income": 8.3252,
        "ocean_proximity": "NEAR BAY"
    }
    
    try:
        response = requests.post(
            f"{BASE_URL}/predict",
            headers={"Content-Type": "application/json"},
            json=sample_data
        )
        
        if response.status_code == 200:
            result = response.json()
            print("✅ Prediction successful!")
            print(f"Predicted Price: {result['formatted_price']}")
            print(f"Raw Price: ${result['predicted_price']:,.2f}\n")
        else:
            print(f"❌ Prediction failed: {response.json()}\n")
            
    except Exception as e:
        print(f"❌ Prediction error: {e}\n")
    
    # Test 4: Test with invalid data
    invalid_data = {
        "longitude": "invalid",
        "latitude": 37.88,
        "housing_median_age": 41,
        "total_rooms": 880,
        "total_bedrooms": 129,
        "population": 322,
        "households": 126,
        "median_income": 8.3252,
        "ocean_proximity": "NEAR BAY"
    }
    
    try:
        response = requests.post(
            f"{BASE_URL}/predict",
            headers={"Content-Type": "application/json"},
            json=invalid_data
        )
        
        if response.status_code != 200:
            print("✅ Error handling working correctly!")
            print(f"Error response: {response.json()}\n")
        else:
            print("⚠️ API should have returned an error for invalid data\n")
            
    except Exception as e:
        print(f"❌ Invalid data test error: {e}\n")

if __name__ == "__main__":
    test_api()
