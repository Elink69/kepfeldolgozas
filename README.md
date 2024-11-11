# Beüzemelés

1. Hozzunk létre egy venv-et
    - python -m venv .venv

2. Aktiváljuk a venv-et
    - .\\.venv\\Scripts\\activate (Windows)
    - source .venv/bin/activate (Linux)

3. Telepítsük a függőségeket
    - python -m pip install -r requirements.txt (GPU support)
    - python -m pip install -r requirements_cpu.txt (CPU only)

4. Navigáljunk a backend mappába
    - cd backend

5. Indítsuk el az API-t
    - fastapi dev main.py

6. Swagger elérhetőség: http://127.0.0.1:8000/docs

# Model tanítás

1. Hozzunk létre egy venv-et
    - python -m venv .venv

2. Aktiváljuk a venv-et
    - .\\.venv\\Scripts\\activate (Windows)
    - source .venv/bin/activate (Linux)

3. Telepítsük a függőségeket
    - python -m pip install -r requirements.txt (GPU support)
    - python -m pip install -r requirements_cpu.txt (CPU only)

4. Navigáljunk a training mappába
    - cd training

5. Konzolból indítsuk el a tanítást
    - yolo detect train data=data.yaml model=yolo11n.pt epochs=100 imgsz=640



# Frontend indítás

1. Node.js telepítés

2. cd frontend-react

3. npm install

4. npm start 
