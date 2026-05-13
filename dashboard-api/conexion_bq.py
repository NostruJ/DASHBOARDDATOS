import json
import os
from google.cloud import bigquery
from google.oauth2 import service_account

if "GOOGLE_CREDENTIALS_JSON" in os.environ:
    cred_info = json.loads(os.environ["GOOGLE_CREDENTIALS_JSON"])
    creds = service_account.Credentials.from_service_account_info(cred_info)
    cliente = bigquery.Client(credentials=creds, project=cred_info["project_id"])
else:
    cliente = bigquery.Client()
