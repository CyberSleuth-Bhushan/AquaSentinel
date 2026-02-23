import urllib.request
import json
import ssl

try:
    req = urllib.request.Request(
        'http://localhost:8000/chat/', 
        data=json.dumps({'messages':[{'role':'user','content':'Hello'}]}).encode('utf-8'), 
        headers={'Content-Type': 'application/json', 'x-api-key': 'aqua_guard_secret_2026'}
    )
    ctx = ssl.create_default_context()
    ctx.check_hostname = False
    ctx.verify_mode = ssl.CERT_NONE
    response = urllib.request.urlopen(req, context=ctx)
    print(response.read().decode())
except urllib.error.HTTPError as e:
    print('HTTP ERROR', e.code)
    print(e.read().decode())
except Exception as e:
    print('ERROR', str(e))
