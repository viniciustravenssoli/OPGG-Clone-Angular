import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environment';
import { Rank } from './Models/Models';

@Injectable({
  providedIn: 'root'
})
export class RankingService {

  private readonly API_KEY =  environment.apiKey;

  constructor(private http: HttpClient) { }

  getPlayers(): Observable<Rank> {
    const url = `https://br1.api.riotgames.com/lol/league/v4/challengerleagues/by-queue/RANKED_SOLO_5x5/?api_key=${this.API_KEY}`;
    return this.http.get<Rank>(url);
  }
}
