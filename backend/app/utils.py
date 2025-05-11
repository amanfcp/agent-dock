from cryptography.fernet import Fernet
import os

# You should securely load this from an environment variable or config in production
FERNET_KEY = os.getenv("FERNET_KEY", Fernet.generate_key())  
fernet = Fernet(FERNET_KEY)

def encrypt_api_key(api_key: str) -> str:
    return fernet.encrypt(api_key.encode()).decode()

def decrypt_api_key(encrypted_key: str) -> str:
    return fernet.decrypt(encrypted_key.encode()).decode()
