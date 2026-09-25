import axios from 'axios';
import { msalInstance } from '../index';
import { loginRequest } from '../authConfig';

const apiClient = axios.create({
    baseURL: 'https://godnllriil.execute-api.us-east-1.amazonaws.com/v1'
});

apiClient.interceptors.request.use(async (config) => {
    const account = msalInstance.getAllAccounts()[0];
    if (account) {
        try {
            const response = await msalInstance.acquireTokenSilent({
                ...loginRequest,
                account: account
            });
            config.headers.Authorization = `Bearer ${response.accessToken}`;
        } catch (error) {
            console.error(error);
        }
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default apiClient;