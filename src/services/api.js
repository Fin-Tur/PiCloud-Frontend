import { useAuthStore } from '@/stores/auth.js'
import router from '@/router'

const API_BASE_URL = import.meta.env.VITE_API_URL;

async function api_call(endpoint, method = "GET", body = null) {

    console.log(`API Call: ${API_BASE_URL}${endpoint}`)
    const options = { method, credentials: 'include' };

    if (body) {
        if (body instanceof FormData) {
            options.body = body;
        } else {
            options.headers = { ...options.headers, "Content-Type": "application/json" };
            options.body = JSON.stringify(body);
        }
    }

    const response = await fetch(API_BASE_URL + endpoint, options);

    if (response.status === 401) {
        const authStore = useAuthStore();
        authStore.clearUser();
        router.push('/login');
        throw new Error('Not authorized. Please log in..');
    }

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `API-Error: ${response.status}`);
    }

    return await response.json();
}

//========= Authentication =========

export async function login(username, password) {
    const response = await api_call('auth/login', 'POST', { username, password });
    if (response?.success) {
        const authStore = useAuthStore();
        authStore.setUser(response.user);
    }
    return response;
}

export async function register(username, password) {
    return await api_call('auth/register', 'POST', { username, password });
}

export async function logout() {
    await api_call('auth/logout', 'POST').catch(() => {});
    const authStore = useAuthStore();
    authStore.clearUser();
    router.push('/login');
}

export async function fetchCurrentUser() {
    const authStore = useAuthStore();
    try {
        const response = await api_call('auth/me', 'GET');
        if (response?.user) {
            authStore.setUser(response.user);
        }
    } catch {
    } finally {
        authStore.markInitialized();
    }
}

//========= File API Calls =========

export async function fetchFiles() {
    return await api_call('files');
}

export async function cryptFile(fileId, password) {
    return await api_call(`files/${fileId}/encrypttion`, 'POST', { password });
}

export async function pressFile(fileId) {
    return await api_call(`files/${fileId}/compression`, 'POST');
}

export async function deleteFile(fileId) {
    return await api_call(`files/${fileId}`, 'DELETE');
}

export async function getUsableSapce(){
    return await api_call('getUsableSpace');
}

export async function getOccupiedSpace(){
    return await api_call('getOccupiedSpace');
}

export async function uploadFile(){}
export async function downloadFile(){}

//========= Dir API Calls =========

export async function fetchDirs() {
    return await api_call('dirs/list', 'GET');
}

export async function deleteDir(dirId) {
    return await api_call(`dirs/delete/${dirId}`, 'DELETE');
}

export async function createDir(dirName, password = "") {
    return await api_call('dirs/create', 'POST', { name: dirName, password: password });
}

export async function getFilesFromDir(dirId, password = "") {
    return await api_call(`dirs/${dirId}/files`, {password: password});
}

export async function moveFileToDir(fileId, dirId) {
    return await api_call(`dirs/move/${fileId}/${dirID}`, 'POST');
}


