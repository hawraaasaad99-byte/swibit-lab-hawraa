const API_BASE_URL = 'http://localhost:8000';
export async function loginApi(email: string, password: string) { 
    const formData = new URLSearchParams(); 
    formData.append('username', email); 
    formData.append('password', password);
const response = await fetch(`${API_BASE_URL}/users/login`, {
     method: 'POST', headers: {
         'Content-Type': 'application/x-www-form-urlencoded', }, body: formData.toString(), });
const data = await response.json(); if (!response.ok) { throw new Error(data.detail || 'An error occurred while connecting to the server'); } return data; }