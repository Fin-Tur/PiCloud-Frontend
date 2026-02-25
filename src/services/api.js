const API_BASE_URL = import.meta.env.VITE_API_URL;


 async function api_call(endpoint, method = "GET", body = null) {
    try{
        const options = { method, credentials: 'include' };
        if(body){

            if(body instanceof FormData){
                options.body = body
            } else {
                options.headers = { ...options.headers, "Content-Type": "application/json" }
                options.body = JSON.stringify(body)
            }
        }
        const response = await fetch(API_BASE_URL + endpoint, options);
        if(!response.ok){
            const errorData = await response.json();
            throw new Error(errorData.message || "API call failed");
        }
        return response;
    } catch (error) {
        console.error("Error in API call:", error);
    }
 }


 export async function login(username, password) {
    const response = await api_call("auth/login", "POST", { username, password });
    return response.json();
 }

 export async function register(username, password) {
    const response = await api_call("auth/register", "POST", { username, password });
    return response.json();
 }