import {Component, OnInit} from '@angular/core';
import {CompetitionService} from "../../../../services/competition.service";
import {Observable} from "rxjs";

@Component({
    selector: 'app-overlay-page',
    template: `
        <div class="min-h-screen bg-[url('/assets/overlay-background.jpg')] bg-cover bg-center flex items-center justify-center">
            <app-leaderboard></app-leaderboard>
        </div>
    `,
    styles: []
})
export class OverlayPageComponent implements OnInit {

    public vm$?: Observable<any>;

    constructor(
        private competitionService: CompetitionService
    ) {
    }

    ngOnInit(): void {

    }

}
