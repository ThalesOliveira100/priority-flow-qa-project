import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/v1";
console.log(API_URL);

const apiClient = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json"
    }
});

export class Api {
    static async getTicketsPendentes () {
        const response = await apiClient.get("/tickets/pendentes");
        return response.data;
    };

    static async getTicketsClassificados () {
        const response = await apiClient.get("/tickets/classificados");
        return response.data;
    };

    static async createTicket (ticketData) {
        const response = await apiClient.post("/tickets", ticketData);
        return response.data;
    };

    static async processarFilaPendentes () {
        const response = await apiClient.post("/tickets/processar-fila");
        return response.data;        
    };
};

export default Api;
