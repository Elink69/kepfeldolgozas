# Beüzemelés

1. Hozzunk létre egy venv-et
    - python -m venv .venv

2. Aktiváljuk a venv-et
    - .\\.venv\\Scripts\\activate (Windows)
    - source .venv/bin/activate (Linux)

3. Telepítsük a függőségeket
    - python -m pip install -r requirements.txt (GPU support)
    - python -m pip install -r requirements_cpu.txt (CPU only)

4. Futtassuk a main.py-t
    - python main.py