import { Component, OnInit } from '@angular/core';
import {CompetitionService} from "../../../../services/competition.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-referee-page',
  template: ``,
  styles: [
  ]
})
export class RefereePageComponent implements OnInit {

  public vm$?: Observable<any>;

  constructor(
      private competitionService: CompetitionService
  ) {
  }

  ngOnInit(): void {
  }

}
