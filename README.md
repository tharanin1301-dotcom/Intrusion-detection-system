# AI-Powered Adaptive Intrusion Detection System using Hybrid Deep Learning

An AI-powered cybersecurity system that combines **Random Forest Machine Learning** and **LSTM Deep Learning** to detect and classify network intrusions using the **NSL-KDD dataset**.

The system provides real-time traffic monitoring, hybrid attack detection, risk classification, attack visualization, security recommendations, and an interactive cybersecurity dashboard.

---

## Project Overview

Traditional Intrusion Detection Systems (IDS) often depend on predefined signatures and may struggle to identify complex or previously unseen attack patterns.

This project proposes a **hybrid intrusion detection architecture** that combines:

- Random Forest for robust tabular feature classification
- LSTM for learning sequential traffic patterns
- Hybrid decision logic for combining model predictions
- Risk-level classification
- Real-time monitoring dashboard
- Attack DNA visualization
- AI-assisted security explanations
- Automated PDF reporting

---

## Objectives

The main objectives of the project are:

1. Detect malicious network traffic using machine learning.
2. Identify different categories of cyber attacks.
3. Combine Random Forest and LSTM predictions.
4. Classify detected traffic according to risk level.
5. Provide real-time intrusion monitoring.
6. Visualize attack patterns using an interactive dashboard.
7. Generate security recommendations.
8. Provide downloadable security reports.

---

## Dataset

### NSL-KDD Dataset

The project uses the **NSL-KDD benchmark dataset**.

### Dataset Files

Place the following files inside the backend directory:

```text
backend/
├── KDDTrain+.txt
└── KDDTest+.txt
# Intrusion-detection-system
