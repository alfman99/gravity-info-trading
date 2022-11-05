from flask import Flask, request
from transformers import BertForSequenceClassification
from transformers import BertTokenizerFast
import torch
import jsonpickle

app = Flask(__name__)
model = BertForSequenceClassification.from_pretrained("CriptoModel")
tokenizer = BertTokenizerFast.from_pretrained('bert-base-uncased')

@app.route("/", methods=["POST"])
def hello():
    req = request.get_json()
    text = req['text']
    model_inputs = tokenizer(text, padding="max_length", truncation = True, return_tensors="pt")
    logits = model(**model_inputs).logits[0]
    logits = torch.nn.functional.softmax(logits)
    logits = logits.tolist()
    return jsonpickle.encode({"positive": logits[0], "negative": logits[1]})

if __name__ == "__main__":
    app.run()