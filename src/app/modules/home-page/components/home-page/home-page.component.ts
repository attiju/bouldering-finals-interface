import { Component, OnInit } from '@angular/core';
import {CompetitionService} from "../../../../services/competition.service";
import {Observable} from "rxjs";
import {Competition} from "../../../../models/competition";

@Component({
  selector: 'app-home-page',
  template: `<pre *ngIf="vm$ | async as vm">{{ vm | json }}</pre>`,
  styles: [
  ]
})
export class HomePageComponent implements OnInit {

  public vm$?: Observable<Competition>;

  constructor(
      private competitionService: CompetitionService
  ) {
  }

  ngOnInit(): void {
    this.vm$ = this.competitionService.getCompetition();
  }

}