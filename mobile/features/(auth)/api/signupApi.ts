const API_BASE_URL = 'http://localhost:8000';
export async function signupApi(userData: any) { 
    const response = await fetch(`${API_BASE_URL}/users/signup`, 
        { method: 'POST', headers: { 'Content-Type': 'application/json', },
         body: JSON.stringify(userData), });
const data = await response.json();
if (!response.ok) { throw new Error(data.detail || 'An error occurred during sign up'); }
return data; }