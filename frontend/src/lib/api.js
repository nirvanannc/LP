import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const TOKEN_KEY = "clinic_admin_token";

export const submitLead = async (payload) => {
  const { data } = await axios.post(`${API}/leads`, payload);
  return data;
};

export const detectLanguage = async () => {
  const { data } = await axios.get(`${API}/geo`, { timeout: 4000 });
  return data.language;
};

export const getAdminToken = () => localStorage.getItem(TOKEN_KEY);
export const clearAdminToken = () => localStorage.removeItem(TOKEN_KEY);

const auth = () => ({ headers: { Authorization: `Bearer ${getAdminToken()}` } });

export const adminLogin = async (passcode) => {
  const { data } = await axios.post(`${API}/admin/login`, { passcode });
  localStorage.setItem(TOKEN_KEY, data.token);
  return data;
};

export const verifyAdmin = async () => {
  const { data } = await axios.get(`${API}/admin/me`, auth());
  return data;
};

export const fetchLeads = async () => {
  const { data } = await axios.get(`${API}/leads`, auth());
  return data;
};

export const updateLeadStatus = async (id, status) => {
  const { data } = await axios.patch(`${API}/leads/${id}/status`, { status }, auth());
  return data;
};

export const downloadLeadsCsv = async () => {
  const { data, headers } = await axios.get(`${API}/leads/export.csv`, {
    ...auth(),
    responseType: "blob",
  });
  const match = /filename="?([^"]+)"?/.exec(headers["content-disposition"] || "");
  const url = URL.createObjectURL(new Blob([data], { type: "text/csv" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = match ? match[1] : "leads.csv";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
};

export const apiError = (e) => {
  const d = e?.response?.data?.detail;
  if (typeof d === "string") return d;
  if (Array.isArray(d)) return d.map((x) => x?.msg || "").join(" ");
  return e?.message || "Something went wrong.";
};
