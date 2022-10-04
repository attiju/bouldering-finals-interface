import {Component, OnInit} from '@angular/core';
import {CompetitionService} from "../../../../services/competition.service";
import {Observable} from "rxjs";

@Component({
    selector: 'app-home-page',
    template: ``,
    styles: []
})
export class HomePageComponent implements OnInit {

    public vm$?: Observable<any>;

    constructor(
        private competitionService: CompetitionService
    ) {
    }

    ngOnInit(): void {
    }

}