import { Component, OnInit } from '@angular/core';
import {CompetitionService} from "../../../../services/competition.service";

@Component({
  selector: 'app-referee-page',
  template: ``,
  styles: [
  ]
})
export class RefereePageComponent implements OnInit {

  constructor(
      private competitionService: CompetitionService
  ) {
  }

  ngOnInit(): void {
  }

}
