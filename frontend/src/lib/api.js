import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export const submitLead = async (payload) => {
  const { data } = await axios.post(`${API}/leads`, payload);
  return data;
};
