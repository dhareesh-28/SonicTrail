from flask import Flask, request, jsonify
from flask_cors import CORS
import threading
import time
import random

app = Flask(__name__)
CORS(app)

data_store = [
    {
        "tile": "tile1",
        "brightness": [0.2, 0.5, 0.1, 0.8],
        "strategy": 3,
        "time": 15,
        "mistakes": 0
    }
]

def generate_mock_data():
    """Background thread to generate mock ESP32 data"""
    while True:
        time.sleep(3)
        brightness = [round(random.uniform(0.1, 1.0), 2) for _ in range(4)]
        best_strat = brightness.index(max(brightness))
        data_store.append({
            "tile": f"tile{random.randint(1, 4)}",
            "brightness": brightness,
            "strategy": best_strat,
            "time": random.randint(10, 60),
            "mistakes": random.randint(0, 3)
        })
        if len(data_store) > 50:
            data_store.pop(0)

# Start background thread for mock data
threading.Thread(target=generate_mock_data, daemon=True).start()

@app.route('/')
def home():
    return "Server working"

@app.route('/update', methods=['POST'])
def update():
    data = request.json
    print("Received:", data)
    data_store.append(data)
    return {"status": "ok"}

@app.route('/data', methods=['GET'])
def get_data():
    return jsonify(data_store)

if __name__ == "__main__":
    print("Starting Flask server...")
    app.run(host='0.0.0.0', port=5000, debug=True)