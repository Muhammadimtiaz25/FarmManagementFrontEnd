import axios from 'axios';

const api = axios.create({
  baseURL: 'https://farm-management-backend-v6ne.vercel.app', 
});


api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
}, err => Promise.reject(err));

export const getMyMissions = async () => {
  const res = await api.get("/missions");
  return res.data;
};

export const createMission = async (missionData) => {
  const res = await api.post("/missions", missionData);
  return res.data;
};


export const getEngineers = async () => {
  const response = await api.get("/engineers");
  return response.data;
};

export const getFarmers = async () => {
  const response = await api.get("/farmers");
  return response.data;
};

export const getRobots = async () => {
  const response = await api.get("/robots");
  return response.data;
};

export const getBatteryStatus = async () => {
  const response = await api.get("/battery");
  return response.data; 
};

export const getChemicalLevel = async () => {
  const response = await api.get("/chemical");
  return response.data; 
};

export const getRentals = async () => {
  const res = await api.get("/rentals");
  return res.data;
};


export const rentNow = async (rentalId, payload) => {
  const res = await api.post(`/rentals/${rentalId}/rent`, payload);
  return res.data;
};

export const getTunnels = async () => {
  const res = await api.get("/tunnels");
  return res.data;
}


export const getAdminEngineers = async () => {
  const res = await api.get("/admin/engineers");
  return res.data;
};

export const getAdminFarmers = async () => {
  const res = await api.get("/admin/farmers");
  return res.data;
};

export const getAdminRobots = async () => {
  const res = await api.get("/admin/robots");
  return res.data;
};


export const addAdminEngineer = async (engineerData) => {
  const res = await api.post("/admin/engineers", engineerData);
  return res.data;
};

export const addAdminFarmer = async (farmerData) => {
  const res = await api.post("/admin/farmers", farmerData);
  return res.data;
};

export const addAdminRobot = async (robotData) => {
  const res = await api.post("/admin/robots", robotData);
  return res.data;
};
export const deleteAdminEngineer = async (id) => {
  const res = await api.delete(`/admin/engineers/${id}`);
  return res.data;
};

export const deleteAdminFarmer = async (id) => {
  const res = await api.delete(`/admin/farmers/${id}`);
  return res.data;
};

export const deleteAdminRobot = async (id) => {
  const res = await api.delete(`/admin/robots/${id}`);
  return res.data;
};




export default api;
