import firebase_admin
from firebase_admin import credentials, db, messaging
from app.config import settings
import os
import json

def init_firebase():
    if not firebase_admin._apps:
        # Load from JSON file OR from string (if deploying to environments without file access)
        if os.path.exists(settings.FIREBASE_CREDENTIALS_PATH):
            cred = credentials.Certificate(settings.FIREBASE_CREDENTIALS_PATH)
        else:
            # For demonstration, we'll try to load it from an env var 'FIREBASE_CRED_JSON'
            try:
                cred_dict = json.loads(os.environ.get("FIREBASE_CRED_JSON", "{}"))
                cred = credentials.Certificate(cred_dict)
            except:
                print("Warning: Firebase credentials not found. Defaulting to application default.")
                cred = credentials.ApplicationDefault()
                
        # Initialize the app with a service account, granting admin privileges
        firebase_admin.initialize_app(cred, {
            'databaseURL': settings.FIREBASE_DATABASE_URL
        })

def get_db():
    return db

def send_push_notification(token: str, title: str, body: str):
    try:
        message = messaging.Message(
            notification=messaging.Notification(
                title=title,
                body=body,
            ),
            token=token,
        )
        response = messaging.send(message)
        print('Successfully sent message:', response)
    except Exception as e:
        print('Error sending message:', e)
