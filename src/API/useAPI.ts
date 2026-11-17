import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://safarveda.com',
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor (Har API call ke sath automatically Auth Token bhejne ke liye)
apiClient.interceptors.request.use(
  async (config) => {
    // Yahan AsyncStorage ya MMKV se token nikal kar attach kar sakte hain
    const token = 'YOUR_AUTH_TOKEN'; 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;
