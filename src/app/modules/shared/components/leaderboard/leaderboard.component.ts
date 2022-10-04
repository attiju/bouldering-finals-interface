import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";

@Component({
    selector: 'app-leaderboard',
    template: ``,
    styles: []
})
export class LeaderboardComponent implements OnInit {

    public vm$?: Observable<any>;

    constructor() {
    }

    ngOnInit(): void {
    }

}
