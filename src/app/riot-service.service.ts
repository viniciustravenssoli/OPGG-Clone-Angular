import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, forkJoin, map, switchMap } from 'rxjs';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class RiotServiceService {

  // you can get ur api_key here https://developer.riotgames.com/

  private readonly API_KEY =  environment.apiKey;
  
  constructor(private http: HttpClient) { }

  getPlayerPUUID(playerName: string): Observable<string> {
    const url = `https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${playerName}?api_key=${this.API_KEY}`;
    return this.http.get<any>(url).pipe(map(response => response.puuid));
  }

  getPlayerID(playerName: string): Observable<string> {
    const url = `https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${playerName}?api_key=${this.API_KEY}`;
    return this.http.get<any>(url).pipe(map(response => response.id));
  }

  getPlayerRankedData(playerId: string): Observable<any[]> {
    const url = `https://br1.api.riotgames.com/lol/league/v4/entries/by-summoner/${playerId}?api_key=${this.API_KEY}`;
    return this.http.get<any[]>(url);
  }
  
  getGameIDs(playerName: string): Observable<string[]> {
    return this.getPlayerPUUID(playerName).pipe(
      switchMap((puuid) =>
        this.http.get<string[]>(
          `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?api_key=${this.API_KEY}`
        )
      )
    );
  }

  getMatchDataArray(playerName: string, numGames: number = 5): Observable<any[]> {
    return this.getGameIDs(playerName).pipe(
      switchMap((gameIDs) =>
        forkJoin(
          gameIDs.slice(0, numGames).map((matchID) =>
            this.http.get<any>(
              `https://americas.api.riotgames.com/lol/match/v5/matches/${matchID}?api_key=${this.API_KEY}`
            )
          )
        )
      )
    );
  }
}
