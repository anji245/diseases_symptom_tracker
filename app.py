from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd
from sklearn.preprocessing import LabelEncoder

app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing

# Load the pre-trained model
try:
    model = joblib.load('logreg_model.pkl')
except FileNotFoundError:
    print("Error: Model file 'logreg_model.pkl' not found.")
    model = None

# Initialize label encoders
label_encoder_symptom = LabelEncoder()
label_encoder_other = LabelEncoder()

# Predefined categories for encoding
symptom_categories = [
    'Cough', 'Fever', 'Fatigue', 'Shortness of breath', 'Headache', 
    'Nausea', 'Vomiting', 'Chills', 'Sore throat', 'Diarrhea', 
    'Body ache', 'Loss of taste', 'Loss of smell'
]

age_categories = ['Child', 'Teenager', 'Young Adult', 'Middle Aged', 'Senior']
likelihood_categories = ['10', '25', '50', '75', '90']
region_categories = ['Urban', 'Rural', 'Suburban']
season_categories = ['Spring', 'Summer', 'Autumn', 'Winter']

# Fit label encoders with predefined categories
label_encoder_symptom.fit(symptom_categories)
label_encoder_other.fit(
    age_categories + 
    likelihood_categories + 
    region_categories + 
    season_categories
)

@app.route('/predict', methods=['POST'])
def predict():
    # Check if model is loaded
    if model is None:
        return jsonify({'error': 'Prediction model is not available'}), 500

    try:
        # Get input data from request
        data = request.get_json()

        # Validate required fields
        required_fields = ['Symptom', 'Age Group', 'Likelihood', 'Region', 'Season']
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'Missing required field: {field}'}), 400

        # Transform input data using label encoders
        symptom = label_encoder_symptom.transform([data['Symptom']])[0]
        age_group = label_encoder_other.transform([data['Age Group']])[0]
        likelihood = label_encoder_other.transform([data['Likelihood']])[0]
        region = label_encoder_other.transform([data['Region']])[0]
        season = label_encoder_other.transform([data['Season']])[0]

        # Prepare input for model prediction
        input_data = pd.DataFrame({
            'Symptom': [symptom],
            'Age Group': [age_group],
            'Likelihood (%)': [likelihood],
            'Region': [region],
            'Season': [season]
        })

        # Make predictions
        severity_pred = model.predict(input_data)
        disease_pred = model.predict(input_data)
        action_pred = model.predict(input_data)

        # Decode predictions back to human-readable format
        severity_pred_decoded = label_encoder_other.inverse_transform(severity_pred)
        disease_pred_decoded = label_encoder_other.inverse_transform(disease_pred)
        action_pred_decoded = label_encoder_other.inverse_transform(action_pred)

        # Return predictions as JSON
        return jsonify({
            'Predicted Severity': severity_pred_decoded[0],
            'Predicted Disease': disease_pred_decoded[0],
            'Predicted Action': action_pred_decoded[0]
        })

    except Exception as e:
        # Log the error and return a generic error message
        print(f"Prediction error: {str(e)}")
        return jsonify({'error': 'An unexpected error occurred during prediction'}), 500

@app.route('/health', methods=['GET'])
def health_check():
    """Simple health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'model_loaded': model is not None
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)