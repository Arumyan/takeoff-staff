import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000/'
});

export const authAPI = {
  login(login, password) {
    return instance.get('auth/', {login, password}).then(response => response.data);
  },
}