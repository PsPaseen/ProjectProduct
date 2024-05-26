import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/',  // เปลี่ยน 'your-aws-ip' เป็น IP จริงของ AWS instance ของคุณ
});

export default api;
