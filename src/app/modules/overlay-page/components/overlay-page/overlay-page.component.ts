import {Component, OnInit} from '@angular/core';
import {CompetitionService} from "../../../../services/competition.service";

@Component({
    selector: 'app-overlay-page',
    template: ``,
    styles: []
})
export class OverlayPageComponent implements OnInit {

    constructor(
        private competitionService: CompetitionService
    ) {
    }

    ngOnInit(): void {
    }

}
