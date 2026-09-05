"""
NSL-KDD Dataset Preprocessor + Real ML Model Trainer
Random Forest (scikit-learn) + LSTM (PyTorch)
"""
import os
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.metrics import accuracy_score, classification_report
import joblib
import torch
import torch.nn as nn
from torch.utils.data import DataLoader, TensorDataset

# Column names for NSL-KDD
COLUMNS = [
    'duration','protocol_type','service','flag','src_bytes','dst_bytes','land',
    'wrong_fragment','urgent','hot','num_failed_logins','logged_in',
    'num_compromised','root_shell','su_attempted','num_root','num_file_creations',
    'num_shells','num_access_files','num_outbound_cmds','is_host_login',
    'is_guest_login','count','srv_count','serror_rate','srv_serror_rate',
    'rerror_rate','srv_rerror_rate','same_srv_rate','diff_srv_rate',
    'srv_diff_host_rate','dst_host_count','dst_host_srv_count',
    'dst_host_same_srv_rate','dst_host_diff_srv_rate','dst_host_same_src_port_rate',
    'dst_host_srv_diff_host_rate','dst_host_serror_rate','dst_host_srv_serror_rate',
    'dst_host_rerror_rate','dst_host_srv_rerror_rate','label','difficulty'
]

# LSTM Model Definition
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


def load_and_preprocess(train_path, test_path):
    print("[*] Loading NSL-KDD dataset...")
    train_df = pd.read_csv(train_path, header=None, names=COLUMNS)
    test_df  = pd.read_csv(test_path,  header=None, names=COLUMNS)

    train_df.drop('difficulty', axis=1, inplace=True)
    test_df.drop('difficulty',  axis=1, inplace=True)

    # Binary label: normal=0, attack=1
    train_df['label'] = (train_df['label'] != 'normal').astype(int)
    test_df['label']  = (test_df['label']  != 'normal').astype(int)

    # Encode categoricals
    cat_cols = ['protocol_type', 'service', 'flag']
    le = LabelEncoder()
    for col in cat_cols:
        combined = pd.concat([train_df[col], test_df[col]])
        le.fit(combined)
        train_df[col] = le.transform(train_df[col])
        test_df[col]  = le.transform(test_df[col])

    feature_cols = [c for c in train_df.columns if c != 'label']
    X_train = train_df[feature_cols].values
    y_train = train_df['label'].values
    X_test  = test_df[feature_cols].values
    y_test  = test_df['label'].values

    scaler  = StandardScaler()
    X_train = scaler.fit_transform(X_train)
    X_test  = scaler.transform(X_test)

    print("[OK] Train shape: " + str(X_train.shape) + "  Test shape: " + str(X_test.shape))
    print("     Attack% Train: " + str(round(y_train.mean()*100,1)) + "%  Test: " + str(round(y_test.mean()*100,1)) + "%")
    return X_train, y_train, X_test, y_test, scaler


def train_random_forest(X_train, y_train, X_test, y_test):
    print("\n[RF] Training Random Forest (100 estimators)...")
    rf = RandomForestClassifier(n_estimators=100, n_jobs=-1, random_state=42)
    rf.fit(X_train, y_train)
    preds = rf.predict(X_test)
    acc   = accuracy_score(y_test, preds)
    print("[RF] Accuracy: " + str(round(acc*100, 2)) + "%")
    print(classification_report(y_test, preds, target_names=['Normal','Attack']))
    joblib.dump(rf, 'rf_model.pkl')
    print("[RF] Saved -> rf_model.pkl")
    return rf, acc


def train_lstm(X_train, y_train, X_test, y_test,
               epochs=15, batch_size=512, lr=0.001):
    print("\n[LSTM] Training LSTM (PyTorch, 2 layers, hidden=64)...")
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    print("[LSTM] Device: " + str(device))

    Xt = torch.FloatTensor(X_train)
    yt = torch.FloatTensor(y_train)
    Xs = torch.FloatTensor(X_test)
    ys = torch.FloatTensor(y_test)

    loader = DataLoader(TensorDataset(Xt, yt), batch_size=batch_size, shuffle=True)

    model = LSTMClassifier().to(device)
    opt   = torch.optim.Adam(model.parameters(), lr=lr)
    crit  = nn.BCELoss()

    for epoch in range(1, epochs+1):
        model.train()
        total_loss = 0
        for xb, yb in loader:
            xb, yb = xb.to(device), yb.to(device)
            opt.zero_grad()
            out  = model(xb)
            loss = crit(out, yb)
            loss.backward()
            opt.step()
            total_loss += loss.item()
        avg = round(total_loss / len(loader), 4)
        print("[LSTM] Epoch " + str(epoch) + "/" + str(epochs) + "  loss=" + str(avg))

    model.eval()
    with torch.no_grad():
        probs = model(Xs.to(device)).cpu().numpy()
    preds = (probs >= 0.5).astype(int)
    acc   = accuracy_score(y_test, preds)
    print("[LSTM] Accuracy: " + str(round(acc*100, 2)) + "%")
    print(classification_report(y_test, preds, target_names=['Normal','Attack']))

    torch.save(model.state_dict(), 'lstm_model.pth')
    print("[LSTM] Saved -> lstm_model.pth")
    return model, acc


if __name__ == '__main__':
    TRAIN = 'KDDTrain+.txt'
    TEST  = 'KDDTest+.txt'

    if not os.path.exists(TRAIN) or not os.path.exists(TEST):
        print("ERROR: Dataset files not found!")
        exit(1)

    print("[*] Starting NSL-KDD training pipeline...")
    X_train, y_train, X_test, y_test, scaler = load_and_preprocess(TRAIN, TEST)
    joblib.dump(scaler, 'scaler.pkl')
    print("[*] Saved -> scaler.pkl")

    rf_model, rf_acc   = train_random_forest(X_train, y_train, X_test, y_test)
    lstm_model, lm_acc = train_lstm(X_train, y_train, X_test, y_test)

    print("\n[DONE] Training Complete!")
    print("       Random Forest Accuracy : " + str(round(rf_acc*100, 2)) + "%")
    print("       LSTM Accuracy          : " + str(round(lm_acc*100, 2)) + "%")
