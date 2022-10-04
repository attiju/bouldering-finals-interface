import {Component, OnInit} from '@angular/core';
import {map, Observable} from "rxjs";
import {CompetitionService} from "../../../../services/competition.service";
import {Competition} from "../../../../models/competition";

@Component({
    selector: 'app-leaderboard',
    template: `
        <div>
            <!-- header -->
            <div class="flex flex-row justify-center mb-4">
                <img class="w-64" src="/assets/logo.png">
            </div>

            <!-- standings -->
            <div class="relative">
                <div style="width: 60vw; height: 50vh" class="flex flex-row items-center justify-center">
                    <div style="height: 80%" class="w-full h-full overflow-auto">
                        <ng-container *ngIf="vm$ | async as vm">
                            <div class="w-full h-full flex flex-col justify-center items-center">
                                <div style="height: calc(0.8 * 50vh / 6)"
                                     class="w-full flex flex-row justify-between items-center px-64 font-bold text-xl text-[#FCE83A] odd:bg-black even:bg-[#222222] py-2"
                                     *ngFor="let climber of vm.climbers; let i = index">
                                    <div class="px-4 text-4xl">{{ i + 1 }}</div>
                                    <div class="px-4 text-xl text-white flex flex-col" style="width: 400px;">
                                        <div class="w-full text-2xl">{{ climber.firstname | titlecase }}</div>
                                        <div class="w-full">{{ climber.lastname | uppercase }}</div>
                                    </div>
                                    <div class="w-1/2 h-full flex-1 flex flex-row items-center justify-center gap-4 px-4">
                                        <div class="bg-yellow-800 h-full w-8 bg-gray-400 flex flex-col justify-center items-center text-sm text-white"
                                             *ngFor="let boulder of climber.boulders">
                                            <div [ngClass]="{ 'bg-[#FCE83A]': boulder.top.done }"
                                                 class="flex-1 w-full bg-[#FCE83A] flex justify-center items-center">
                                                <ng-container
                                                        *ngIf="boulder.top.done">{{ boulder.top.tries }}</ng-container>
                                            </div>
                                            <div [ngClass]="{ 'bg-[#FCE83A]': boulder.zone.done }"
                                                 class="flex-1 w-full flex justify-center items-center">
                                                <ng-container
                                                        *ngIf="boulder.zone.done">{{ boulder.zone.tries }}</ng-container>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ng-container>
                    </div>
                </div>

                <!-- left hand -->
                <div style="transform: scale(150%) translateX(28%)" class="absolute right-0 top-0 bottom-0">
                    <img class="w-full h-full" src="/assets/overlay-left-hand.png">
                </div>
                <!-- right hand -->
                <div style="transform: scale(165%) translateX(-28%)" class="absolute left-0 top-0 bottom-0">
                    <img class="w-full h-full" src="/assets/overlay-right-hand.png">
                </div>
            </div>

            <!-- partners -->
            <div class="flex flex-row justify-center mt-4">
                <img class="w-64" src="/assets/overlay-partners.png">
            </div>
        </div>
    `,
    styles: []
})
export class LeaderboardComponent implements OnInit {

    public vm$?: Observable<Competition>;

    constructor(
        private competitionService: CompetitionService
    ) {
    }

    ngOnInit(): void {
        this.vm$ = this.competitionService.getCompetition()
            .pipe(map(competition => {
                return {
                    ...competition,
                    climbers: [...competition.climbers]
                        .sort((c1, c2) => {
                            const C1Tops = c1.boulders.filter(b => b.top.done).length;
                            const C1TopTries = c1.boulders.filter(b => b.top.done).map(b => b.top.tries).reduce((acc, curr) => acc + curr, 0);
                            const C1Zones = c1.boulders.filter(b => b.zone.done).length;
                            const C1ZoneTries = c1.boulders.filter(b => b.zone.done).map(b => b.zone.tries).reduce((acc, curr) => acc + curr, 0);
                            const C2Tops = c2.boulders.filter(b => b.top.done).length;
                            const C2TopTries = c2.boulders.filter(b => b.top.done).map(b => b.top.tries).reduce((acc, curr) => acc + curr, 0);
                            const C2Zones = c2.boulders.filter(b => b.zone.done).length;
                            const C2ZoneTries = c2.boulders.filter(b => b.zone.done).map(b => b.zone.tries).reduce((acc, curr) => acc + curr, 0);

                            if (C1Tops > C2Tops) return -1
                            else if (C2Tops > C1Tops) return 1;
                            else if (C1Zones > C2Zones) return -1;
                            else if (C2Zones > C1Zones) return 1;
                            else if (C1TopTries > C2TopTries) return 1;
                            else if (C2TopTries > C1TopTries) return -1;
                            else if (C1ZoneTries > C2ZoneTries) return 1;
                            else if (C2ZoneTries > C1ZoneTries) return -1;
                            return 0;
                        })
                };
            }))
    }

}
