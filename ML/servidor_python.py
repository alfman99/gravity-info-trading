from flask import Flask, request
from transformers import BertForSequenceClassification
from transformers import BertTokenizerFast
import torch
import jsonpickle

app = Flask(__name__)

model_crypto = BertForSequenceClassification.from_pretrained("CryptoModel")
tokenizer_crypto = BertTokenizerFast.from_pretrained('bert-base-uncased')
@app.route("/Crypto", methods=["POST"])
def Crypto_model():
    req = request.get_json()
    text = req['text']
    model_inputs = tokenizer_crypto(text, padding="max_length", truncation = True, return_tensors="pt")
    logits = model_crypto(**model_inputs).logits[0]
    logits = torch.nn.functional.softmax(logits).tolist()
    return jsonpickle.encode({"positive": logits[0], "negative": logits[1]})

model_financial = BertForSequenceClassification.from_pretrained("ProsusAI/finbert")
tokenizer_financial = BertTokenizerFast.from_pretrained("ProsusAI/finbert")
@app.route("/Financial", methods=["POST"])
def Financial_model():
    req = request.get_json()
    text = req['text']
    model_inputs = tokenizer_financial(text, padding="max_length", truncation = True, return_tensors="pt")
    logits = model_financial(**model_inputs).logits[0]
    logits = torch.nn.functional.softmax(logits)
    if torch.argmax(logits) == 2:
        return jsonpickle.encode({"positive": 0.5, "negative": 0.5})
    logits = logits.tolist()
    return jsonpickle.encode({"positive": logits[0], "negative": logits[1]})

if __name__ == "__main__":
    app.run()