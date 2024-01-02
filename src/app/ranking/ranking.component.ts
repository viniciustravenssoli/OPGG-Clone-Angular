import { Component } from '@angular/core';
import { RankingService } from '../ranking.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Rank, RankSummoner } from '../Models/Models';
import { NumberInput } from '@angular/cdk/coercion';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent {

  constructor(private rankingService: RankingService, private router: Router, private route: ActivatedRoute) { }

  rank!: Rank

  ngOnInit(): void {
    this.loadPlayer();
  }

  loadPlayer() {
    this.rankingService.getPlayers().subscribe({
      next: (rank) => {
        this.rank = rank
        this.sortPlayerByLeaguePoints(this.rank)
        console.log(this.rank);
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  private sortPlayerByLeaguePoints(rank: Rank): void {
    if (rank && rank.entries) {
      rank.entries.sort((a, b) => b.leaguePoints - a.leaguePoints);
    }
  }

  calculateWinrate(rank: RankSummoner): string {
    const totalGames = rank.wins + rank.losses;

    if (totalGames !== 0) {
      const winrate = (rank.wins / totalGames * 100).toFixed(2);
      return `${winrate}%`;
    } else {
      return 'N/A';
    }
  }


  calculateProgressBarValue(wins: number, losses: number): number {
    return (wins / (wins + losses)) * 100;
  }


}
