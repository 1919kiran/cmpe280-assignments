from flask import Flask, jsonify, request, render_template
from flask_cors import CORS
from pymongo import MongoClient

app = Flask(__name__, static_url_path="/static", static_folder="static/")
CORS(app, resources={r"*": {"origins": "*"}})
client = MongoClient("mongodb+srv://admin280:cmpe280@cluster0.i0amk.mongodb.net/?retryWrites=true&w=majority")
db = client["280"]
collection = db["patients"]


@app.route("/", methods=["POST", "GET"])
def demographics():
    return render_template("demographics.html")


@app.route("/reports", methods=["POST", "GET"])
def reports():
    cursor = collection.find()
    patient_records = []
    for document in cursor:
        patient = dict()
        patient["name"] = document["demographics-firstName"] + " " + document["demographics-lastName"]
        patient["age"] = document["demographics-age"]
        patient["gender"] = document["demographics-gender"]
        patient["photo"] = document["demographics-webcam-capture"]
        patient["height"] = document["vitals-height"]
        patient["weight"] = document["vitals-weight"]
        patient["temperature"] = document["vitals-temperature"]
        patient["bp"] = document["vitals-bp"]
        patient["medications"] = document["vitals-medications"]
        patient["notes"] = document["vitals-notes"]
        patient["file"] = document["vitals-file"]
        patient_records.append(patient)
    return render_template("reports.html", patient_records=patient_records)


@app.route("/vitals", methods=["POST", "GET"])
def vitals():
    return render_template("vitals.html")


@app.route("/upload-details", methods=["GET", "POST"])
def upload_details():
    data = request.json
    result = collection.insert_one(data)
    print(result.inserted_id)

    return "OK"


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=80, debug=True)
