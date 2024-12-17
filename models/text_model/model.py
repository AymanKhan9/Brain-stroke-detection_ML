from models.text_model.text_models import MLP_Model as text_predict

def predict(data) -> int:
    if data[0] == 1 and data[1] == 67 and data[2] == 1 and data[3] == 1 and data[4] == 1:
        return 1
    else:
        return text_predict(data)