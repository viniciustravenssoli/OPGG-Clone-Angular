import { Component } from '@angular/core';
import { RiotServiceService } from '../riot-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, Observable, switchMap } from 'rxjs';
import { Participant, Root, Root2 } from '../Models/Models';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-search-component',
  templateUrl: './search-component.component.html',
  styleUrls: ['./search-component.component.css']
})
export class SearchComponentComponent {

  constructor(private riotService: RiotServiceService, private router: Router, private route: ActivatedRoute) { }

  summonerName = '';
  summonerId = '';

  rankedData: Root2[] = [];
  matchData: Root[] = [];

  isLoading = false;
  showLoadMore = false;

  loadedMatches = 5;


  ngOnInit(): void {

  }

  CreateErrorHandler(error : HttpErrorResponse) : Observable<any> {
    console.log(error)
    return EMPTY
  }

  secondsToMinutes(seconds: number) {
    const minutes = seconds / 60;
    return minutes.toFixed(1);
  }

  calculateKDA(kills: number, deaths: number, assists: number): string {
    const kda = (kills + assists) / deaths;
    return kda.toFixed(2);
  }

  setLoadedMatches() {
    this.loadedMatches = 5;
  }

  setNewSummonerNameAndReloadData(riotIdGameName: string) {
    this.summonerName = riotIdGameName;
    this.loadedMatches = 5;
    this.loadMatchesData();
  }

  ReloadRankedData(summonerId: string) {
    this.summonerId = summonerId
    this.loadRankedData();
  }

  getAndSetPlayerId() {
    return this.riotService.getPlayerID(this.summonerName);
  }

  loadRankedData() {
    this.getAndSetPlayerId().pipe(
      switchMap((summonerId) => {
        return this.riotService.getPlayerRankedData(summonerId);
      })
    ).subscribe({
      next: (rankedData) => {
        this.rankedData = rankedData;
        console.log('Ranked data:', this.rankedData);
      },
      error: (error) => {
        this.CreateErrorHandler(error);
      }
    });
  }
  

  loadMatchesData() {
    this.isLoading = true;
    this.riotService.getMatchDataArray(this.summonerName, this.loadedMatches).subscribe({
      next: (matches) => {
        this.matchData = matches;
        console.log(this.matchData);
        this.sortParticipantsByPlacement();
        this.isLoading = false;
        this.showLoadMore = true;
      },
      error: (error) => {
        this.CreateErrorHandler(error);
        this.isLoading = false;
      }
    });
  }

  sortParticipantsByPlacement() {
    this.matchData.forEach(match => {
      match.info.participants.sort((a: { placement: number; }, b: { placement: number; }) => a.placement - b.placement);
    });
  }

  loadMoreMatches() {
    this.loadedMatches += 5;
    this.loadMatchesData();
  }

  calculateWinrate(rank: any): string {
    const totalGames = rank.wins + rank.losses;

    if (totalGames !== 0) {
      const winrate = (rank.wins / totalGames * 100).toFixed(2);
      return `${winrate}%`;
    } else {
      return 'N/A';
    }
  }

  getAllDamagesDealth(participants: Participant[]): number[] {
    return participants.map(participant => participant.totalDamageDealtToChampions);
  }

  getAllDamagesTaken(participants: Participant[]): number[] {
    return participants.map(participant => participant.totalDamageTaken);
  }

  calculateProgressBarValue(damage: number, allDamages: number[]): number {
    const maxValue = Math.max(...allDamages);
    return (damage / maxValue) * 100;
  }
  
}
