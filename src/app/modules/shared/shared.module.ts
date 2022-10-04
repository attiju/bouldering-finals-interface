import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';



@NgModule({
  declarations: [
    LeaderboardComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
      LeaderboardComponent
  ]
})
export class SharedModule { }
