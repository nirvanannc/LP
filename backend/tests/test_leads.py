import os
import pytest
import requests

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://drsoni-jaipur.preview.emergentagent.com').rstrip('/')
API = f"{BASE_URL}/api"


@pytest.fixture(scope="module")
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


def test_root(client):
    r = client.get(f"{API}/")
    assert r.status_code == 200


def test_create_selfcheck_lead(client):
    payload = {
        "name": "TEST_SelfCheck User",
        "phone": "9998887771",
        "source": "self_check",
        "track": "general",
        "track_label": "General mental health",
        "score": 18,
        "max_score": 24,
        "risk_band": "high",
        "answers": [
            {"question": "Q1", "answer": "Almost always", "value": 3},
            {"question": "Q2", "answer": "Often", "value": 2},
        ],
        "language": "en",
    }
    r = client.post(f"{API}/leads", json=payload)
    assert r.status_code == 200, r.text
    data = r.json()
    assert "id" in data and isinstance(data["id"], str)
    assert data["email_sent"] is True
    assert data["name"] == payload["name"]
    assert data["risk_band"] == "high"
    assert data["source"] == "self_check"
    # verify persisted via list
    lr = client.get(f"{API}/leads")
    assert lr.status_code == 200
    ids = [x["id"] for x in lr.json()]
    assert data["id"] in ids


def test_create_booking_lead(client):
    payload = {
        "name": "TEST_Booking User",
        "phone": "9998887772",
        "source": "booking_form",
        "concern": "Anxiety",
        "preferred_time": "Tomorrow 5pm",
        "language": "hi",
    }
    r = client.post(f"{API}/leads", json=payload)
    assert r.status_code == 200, r.text
    data = r.json()
    assert "id" in data
    assert data["source"] == "booking_form"
    assert data["concern"] == "Anxiety"


def test_list_leads_newest_first(client):
    r = client.get(f"{API}/leads")
    assert r.status_code == 200
    leads = r.json()
    assert isinstance(leads, list)
    assert len(leads) >= 2
    # newest first: created_at sorted descending
    times = [l["created_at"] for l in leads]
    assert times == sorted(times, reverse=True)
