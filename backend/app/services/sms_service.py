def send_sms(phone_number: str, message: str):
    """
    SMS stub function as per requirements.
    In production, integrate with Twilio, AWS SNS, or similar SMS provider.
    """
    print(f"--- SMS NOTIFICATION ---")
    print(f"TO: {phone_number}")
    print(f"MSG: {message}")
    print(f"------------------------")
    return True
