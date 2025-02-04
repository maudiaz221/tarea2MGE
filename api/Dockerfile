FROM python:3.10.16

WORKDIR /app/back  

COPY requirements.txt . 
RUN pip install --no-cache-dir -r requirements.txt 

RUN pip install -U pip 
    
RUN pip install -U setuptools wheel 

RUN pip install autogluon.tabular==0.8.3 --extra-index-url https://download.pytorch.org/whl/cpu \
    catboost \
    lightgbm \
    scikit-learn \
    xgboost \
    torch torchvision torchaudio 

COPY . .  

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]

