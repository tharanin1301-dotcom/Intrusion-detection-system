"""
Real ML prediction using trained Random Forest + LSTM models.
Falls back to mock if models are not yet trained.
"""
import os
import sys
import random
import numpy as np
import torch
import torch.nn as nn
import joblib

# Force UTF-8 output to avoid Windows cp1252 issues
if sys.stdout.encoding != 'utf-8':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

# LSTM Architecture (must match train_models.py)
class LSTMClassifier(nn.Module):
    def __init__(self, input_size=41, hidden_size=64, num_layers=2):
        super(LSTMClassifier, self).__init__()
        self.lstm = nn.LSTM(input_size, hidden_size, num_layers,
                            batch_first=True, dropout=0.3)
        self.fc   = nn.Linear(hidden_size, 1)
        self.sig  = nn.Sigmoid()

    def forward(self, x):
        x = x.unsqueeze(1)
        out, _ = self.lstm(x)
        out = self.fc(out[:, -1, :])
        return self.sig(out).squeeze()


# Global model state
rf_model       = None
lstm_model     = None
scaler         = None
MODELS_TRAINED = False
_models_loaded = False   # load only once

RF_ACCURACY    = 77.07
LSTM_ACCURACY  = 77.24


def load_models():
    global rf_model, lstm_model, scaler, MODELS_TRAINED, _models_loaded
    if _models_loaded:
        return
    _models_loaded = True

    base_dir = os.path.dirname(os.path.abspath(__file__))
    rf_path = os.path.join(base_dir, 'rf_model.pkl')
    lstm_path = os.path.join(base_dir, 'lstm_model.pth')
    scaler_path = os.path.join(base_dir, 'scaler.pkl')

    if (os.path.exists(rf_path) and
            os.path.exists(lstm_path) and
            os.path.exists(scaler_path)):
        try:
            print("[IDS] Loading trained models...")
            rf_model = joblib.load(rf_path)
            scaler   = joblib.load(scaler_path)

            device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
            lstm_model = LSTMClassifier()
            lstm_model.load_state_dict(
                torch.load(lstm_path, map_location=device, weights_only=True)
            )
            lstm_model.eval()
            MODELS_TRAINED = True
            print("[IDS] Real models loaded successfully! RF=" + str(RF_ACCURACY) + "% LSTM=" + str(LSTM_ACCURACY) + "%")
        except Exception as e:
            print("[IDS] Could not load models: " + str(e) + ". Using mock predictions.")
            MODELS_TRAINED = False
    else:
        print("[IDS] Trained model files not found. Using mock predictions.")
        print("[IDS] Run: python train_models.py  to train on NSL-KDD dataset.")


def get_hybrid_prediction(features: list) -> dict:
    """Run hybrid RF + LSTM prediction and apply risk logic."""
    load_models()

    if MODELS_TRAINED and rf_model is not None and lstm_model is not None:
        # Real prediction
        arr = np.array(features, dtype=float).reshape(1, -1)
        arr = scaler.transform(arr)

        rf_pred  = int(rf_model.predict(arr)[0])
        rf_proba = rf_model.predict_proba(arr)[0]
        rf_conf  = float(rf_proba[rf_pred] * 100)

        tensor = torch.FloatTensor(arr)
        with torch.no_grad():
            prob = lstm_model(tensor).item()
        lstm_pred = 1 if prob >= 0.5 else 0
        lstm_conf = float(prob * 100) if lstm_pred == 1 else float((1 - prob) * 100)
    else:
        # Mock prediction
        rf_pred   = 1 if random.random() > 0.6  else 0
        rf_conf   = random.uniform(60.0, 99.9)
        lstm_pred = 1 if random.random() > 0.65 else 0
        lstm_conf = random.uniform(55.0, 99.9)

    # Hybrid decision + risk classification
    final_result    = "NORMAL"
    risk_level      = "NORMAL"
    recommendations = [
        "Traffic clean - no action needed",
        "Normal operations continuing",
        "Routine monitoring active"
    ]

    if lstm_conf > 85.0 and rf_pred == 1:
        risk_level      = "HIGH RISK"
        final_result    = "ATTACK DETECTED"
        recommendations = [
            "Block source IP immediately",
            "Isolate affected network segment",
            "Alert security team now",
            "Capture network packets for forensics"
        ]
    elif lstm_conf > 60.0 or rf_pred == 1:
        risk_level      = "MEDIUM RISK"
        final_result    = "ATTACK DETECTED"
        recommendations = [
            "Monitor closely for escalation",
            "Enable full packet logging",
            "Verify firewall rule sets",
            "Check associated user activity"
        ]
    elif rf_pred == 1 or lstm_pred == 1:
        risk_level      = "LOW RISK"
        final_result    = "ATTACK DETECTED"
        recommendations = [
            "Continue monitoring",
            "Review recent log entries",
            "Update IDS signatures"
        ]

    return {
        "rf_prediction":   rf_pred,
        "lstm_prediction": lstm_pred,
        "rf_confidence":   round(rf_conf,   2),
        "lstm_confidence": round(lstm_conf, 2),
        "final_result":    final_result,
        "risk_level":      risk_level,
        "recommendations": recommendations,
        "models_trained":  MODELS_TRAINED
    }
