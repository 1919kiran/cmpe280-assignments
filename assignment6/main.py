import os
import pickle

from PyPDF2 import PdfReader
from flask import Flask, render_template, request, jsonify, url_for, redirect
from flask_cors import CORS
from langchain.chains.question_answering import load_qa_chain
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.llms import OpenAI
from langchain.text_splitter import CharacterTextSplitter
from langchain.vectorstores import FAISS

app = Flask(__name__, static_url_path="/static", static_folder="static/")
CORS(app, resources={r"*": {"origins": "*"}})
os.environ["OPENAI_API_KEY"] = "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"
qa_chain = None
knowledge_db = None


@app.route("/", methods=["GET"])
def index():
    return redirect(url_for("chat"))


@app.route("/chat", methods=["GET", "POST"])
def chat():
    if request.method == "POST":
        user_message = request.json["message"]
        chatbot_answer = get_response_from_model(user_message)
        if chatbot_answer == "ERROR":
            chatbot_answer = "Server Error. Please try again."
            create_knowledge_db()
            create_qa_chain()

        response = {
            "answer": chatbot_answer
        }
        return jsonify(response)

    elif request.method == "GET":
        create_qa_chain()
        return render_template("index.html")


def get_response_from_model(message):
    if knowledge_db is None or qa_chain is None:
        return "ERROR"
    docs = knowledge_db.similarity_search(message)
    response = qa_chain.run(input_documents=docs, question=message)
    return response


def create_qa_chain():
    load_knowledge_db()
    global qa_chain
    qa_chain = load_qa_chain(OpenAI(model_name="gpt-3.5-turbo"), chain_type="stuff")


def create_knowledge_db():
    reader = PdfReader("dataset/handbook_min.pdf")
    raw_text = ""
    for i, page in enumerate(reader.pages):
        text = page.extract_text()
        if text:
            raw_text += text
    text_splitter = CharacterTextSplitter(
        separator="\n",
        chunk_size=1000,
        chunk_overlap=200,
        length_function=len,
    )
    texts = text_splitter.split_text(raw_text)
    embeddings = OpenAIEmbeddings()
    global knowledge_db
    knowledge_db = FAISS.from_texts(texts, embeddings)
    fp = open("db/knowledge_db.pkl", "wb")
    pickle.dump(knowledge_db, fp)
    fp.close()


def load_knowledge_db():
    db_file = open("db/knowledge_db.pkl", "rb")
    global knowledge_db
    knowledge_db = pickle.load(db_file)
    db_file.close()


if __name__ == "__main__":
    # create_knowledge_db()
    load_knowledge_db()
    create_qa_chain()
    app.run(host="127.0.0.1", port=8080, debug=True)
