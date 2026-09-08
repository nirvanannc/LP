"""Backend tests for the admin auth + protected leads endpoints (iteration 7)."""
import os
import pytest
import requests

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://drsoni-jaipur.preview.emergentagent.com').rstrip('/')
API = f"{BASE_URL}/api"
PASSCODE = "SoniClinic@2026"


@pytest.fixture(scope="module")
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


@pytest.fixture(scope="module")
def token(client):
    r = client.post(f"{API}/admin/login", json={"passcode": PASSCODE})
    assert r.status_code == 200, r.text
    data = r.json()
    assert "token" in data and isinstance(data["token"], str) and len(data["token"]) > 20
    return data["token"]


@pytest.fixture(scope="module")
def auth_headers(token):
    return {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}


# ---------- admin login ----------
def test_admin_login_wrong_passcode(client):
    r = client.post(f"{API}/admin/login", json={"passcode": "wrong-passcode-xyz"})
    assert r.status_code == 401
    assert "Incorrect passcode" in r.text


def test_admin_login_correct(token):
    assert token  # fixture already asserts shape


# ---------- admin/me ----------
def test_admin_me_valid(client, auth_headers):
    r = client.get(f"{API}/admin/me", headers=auth_headers)
    assert r.status_code == 200
    body = r.json()
    assert body.get("ok") is True


def test_admin_me_garbage_token(client):
    r = client.get(f"{API}/admin/me", headers={"Authorization": "Bearer not.a.real.jwt"})
    assert r.status_code == 401


def test_admin_me_no_header(client):
    r = requests.get(f"{API}/admin/me")
    assert r.status_code == 401


# ---------- leads listing protection ----------
def test_leads_requires_auth():
    r = requests.get(f"{API}/leads")
    assert r.status_code == 401


def test_leads_list_with_auth(client, auth_headers):
    r = client.get(f"{API}/leads", headers=auth_headers)
    assert r.status_code == 200
    leads = r.json()
    assert isinstance(leads, list)
    if leads:
        assert "status" in leads[0]
        assert "id" in leads[0]


# ---------- public lead create still works (no auth) ----------
def test_public_lead_create_selfcheck(client):
    payload = {
        "name": "TEST_admin_selfcheck",
        "phone": "9998887701",
        "source": "self_check",
        "track": "general",
        "score": 10,
        "max_score": 24,
        "risk_band": "moderate",
        "answers": [{"question": "Q1", "answer": "Sometimes", "value": 1}],
        "language": "en",
    }
    r = requests.post(f"{API}/leads", json=payload)
    assert r.status_code == 200, r.text
    assert r.json()["source"] == "self_check"


def test_public_lead_create_booking_form_selfcheck(client):
    payload = {
        "name": "TEST_admin_booking",
        "phone": "9998887702",
        "source": "booking_form_selfcheck",
        "concern": "Anxiety / Depression",
        "language": "en",
    }
    r = requests.post(f"{API}/leads", json=payload)
    assert r.status_code == 200, r.text
    assert r.json()["source"] == "booking_form_selfcheck"


# ---------- patch lead status ----------
def _create_lead():
    r = requests.post(f"{API}/leads", json={
        "name": "TEST_status_lead",
        "phone": "9998887703",
        "source": "booking_form",
        "concern": "General",
        "language": "en",
    })
    assert r.status_code == 200, r.text
    return r.json()["id"]


def test_patch_status_success_and_persist(client, auth_headers):
    lead_id = _create_lead()
    r = client.patch(f"{API}/leads/{lead_id}/status", headers=auth_headers, json={"status": "contacted"})
    assert r.status_code == 200
    body = r.json()
    assert body["status"] == "contacted"
    # re-fetch through list and verify persistence
    r2 = client.get(f"{API}/leads", headers=auth_headers)
    assert r2.status_code == 200
    match = next((x for x in r2.json() if x["id"] == lead_id), None)
    assert match is not None
    assert match["status"] == "contacted"


def test_patch_status_invalid_value(client, auth_headers):
    lead_id = _create_lead()
    r = client.patch(f"{API}/leads/{lead_id}/status", headers=auth_headers, json={"status": "bogus"})
    assert r.status_code == 400


def test_patch_status_unknown_id(client, auth_headers):
    r = client.patch(f"{API}/leads/does-not-exist-xyz/status", headers=auth_headers, json={"status": "contacted"})
    assert r.status_code == 404


def test_patch_status_requires_auth():
    r = requests.patch(f"{API}/leads/any-id/status", json={"status": "contacted"})
    assert r.status_code == 401
