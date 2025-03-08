import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class MoviesService {
  private readonly API_URL = 'https://api.themoviedb.org/3/movie/popular';
  private readonly API_KEY = process.env.TMDB_API_KEY || ''; // Ensure it’s not undefined


  constructor(private readonly httpService: HttpService) {}

  async getMovies() {
    try {
      console.log(`Fetching movies from: ${this.API_URL}?api_key=${this.API_KEY}`);
  
      const response = await lastValueFrom(
        this.httpService.get(`${this.API_URL}?api_key=${this.API_KEY}`)
      );
  
      console.log('API Response:', response.data); // Log response
  
      return response.data.results || [];
    } catch (error) {
      console.error('Error fetching movies:', error.response?.data || error.message);
      throw new Error('Failed to fetch movie data');
    }
  }
  
}