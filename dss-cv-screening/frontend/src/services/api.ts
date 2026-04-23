import axios from 'axios';
import type { AxiosInstance } from 'axios';
import type { Kandidat, Bobot, RankingResult } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add interceptor for JWT
    this.api.interceptors.request.use((config) => {
      const token = localStorage.getItem('access_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }

  // Auth endpoints
  async login(username: string, password: string): Promise<{ access_token: string }> {
    const response = await this.api.post('/auth/login', { username, password });
    if (response.data.access_token) {
      localStorage.setItem('access_token', response.data.access_token);
    }
    return response.data;
  }

  async register(username: string, password: string): Promise<any> {
    const response = await this.api.post('/auth/register', { username, password });
    return response.data;
  }

  logout() {
    localStorage.removeItem('access_token');
  }

  // Kandidat endpoints
  async getKandidats(): Promise<Kandidat[]> {
    const response = await this.api.get('/kandidat');
    return response.data;
  }

  async createKandidat(data: Partial<Kandidat>): Promise<Kandidat> {
    const response = await this.api.post('/kandidat', data);
    return response.data;
  }

  async updateKandidat(id: string, data: Partial<Kandidat>): Promise<Kandidat> {
    const response = await this.api.put(`/kandidat/${id}`, data);
    return response.data;
  }

  async deleteKandidat(id: string): Promise<void> {
    await this.api.delete(`/kandidat/${id}`);
  }

  // Bobot endpoints
  async getBobots(): Promise<Bobot[]> {
    const response = await this.api.get('/bobot');
    return response.data;
  }

  async updateBobot(id: string, data: Partial<Bobot>): Promise<Bobot> {
    const response = await this.api.put(`/bobot/${id}`, data);
    return response.data;
  }

  // SAW endpoints
  async calculateRanking(): Promise<RankingResult[]> {
    const response = await this.api.post('/saw/calculate');
    return response.data;
  }

  async getRanking(): Promise<RankingResult[]> {
    const response = await this.api.get('/saw/ranking');
    return response.data;
  }
}

export default new ApiService();
