import {Component, OnInit} from '@angular/core';
import {map, Observable, switchMap, tap, timer} from "rxjs";
import {Competition} from "../../../../models/competition";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {environment} from "../../../../../environments/environment";

@Component({
    selector: 'app-overlay-page',
    template: `
        <ng-container *ngIf="vm$ | async as vm">
            <div class="min-h-screen bg-cover bg-center flex items-center justify-center {{ vm.filter.minimal ? '' : bgImageClass }}">
                <div>
                    <!-- header -->
                    <div *ngIf="!vm.filter.minimal" class="flex flex-row justify-center mb-4">
                        <img class="w-64" src="/assets/logo.png">
                    </div>

                    <!-- standings -->
                    <div class="relative">
                        <div [ngStyle]="{ width: vm.filter.minimal ? '50vw' : '60vw'}" style="height: 50vh"
                             class="flex flex-row items-center justify-center">
                            <div style="height: 80%" class="w-full h-full overflow-visible">
                                <div class="w-full h-full flex flex-col justify-center items-center">
                                    <div
                                            [ngClass]="{ 
                                                'pl-64': vm.filter.minimal && vm.filter.hideRight, 
                                                'pr-64': vm.filter.minimal && vm.filter.hideLeft,
                                                'px-64': !vm.filter.minimal,
                                                'mt-2': vm.filter.type === 'top' && i === 3 
                                            }"
                                            style="height: calc(0.8 * 50vh / 6)"
                                            class="w-full flex flex-row justify-between items-center  font-bold text-xl text-[#FCE83A] odd:bg-black even:bg-[#222222] py-2"
                                            *ngFor="let climber of vm.competition.climbers; let i = index">
                                        <div class="px-4 text-4xl">{{ vm.filter.type === 'top' ? (i % 3) + 1 : (i + 1) }}</div>
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
                            </div>
                        </div>

                        <!-- left hand -->
                        <div *ngIf="!vm.filter.hideRight" style="transform: scale(150%) translateX(28%)"
                             class="absolute right-0 top-0 bottom-0">
                            <img class="w-full h-full" src="/assets/overlay-left-hand.png">
                        </div>
                        <!-- right hand -->
                        <div *ngIf="!vm.filter.hideLeft" style="transform: scale(175%) translateX(-28%)"
                             class="absolute left-0 top-0 bottom-0">
                            <img class="w-full h-full" src="/assets/overlay-right-hand.png">
                        </div>
                    </div>

                    <!-- partners -->
                    <div *ngIf="!vm.filter.minimal" class="flex flex-row justify-center mt-4">
                        <img class="w-64" src="/assets/overlay-partners.png">
                    </div>
                </div>
            </div>
        </ng-container>
    `,
    styles: []
})
export class OverlayPageComponent implements OnInit {

    public bgImageClass = 'bg-[url("/assets/overlay-background.jpg")]';

    public vm$?: Observable<{
        filter: any,
        competition: Competition
    }>;

    constructor(
        private http: HttpClient,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit(): void {
        this.vm$ = timer(0, 30000)
            .pipe(switchMap(genderTick => {
                return timer(0, 1000)
                    .pipe(switchMap(tick => {
                        return this.route.queryParamMap.pipe(
                            switchMap(params => {
                                return this.http.get<Competition>(`${environment.api}/competitions/${environment.competitionId}`)
                                    .pipe(
                                        map(competition => {
                                            return {
                                                filter: {
                                                    gender: params.get('gender'),
                                                    minimal: params.get('minimal'),
                                                    hideLeft: params.get('hideLeft'),
                                                    hideRight: params.get('hideRight'),
                                                    type: params.get('type'),
                                                },
                                                competition: {
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
                                                        .filter((c) => {
                                                            if (params.get('type') === 'top') return true;

                                                            if (params.get('gender') === null)
                                                                return c.gender === (genderTick & 1 ? 'female' : 'male');

                                                            return c.gender === params.get('gender');
                                                        })
                                                }
                                            };
                                        }),
                                        map(vm => {
                                            return {
                                                filter: vm.filter,
                                                competition: {
                                                    ...vm.competition,
                                                    males: vm.competition.climbers.filter(c => c.gender === 'male').filter((c,i) => i < 3),
                                                    females: vm.competition.climbers.filter(c => c.gender === 'female').filter((c,i) => i < 3)
                                                }
                                            }
                                        }),
                                        map(vm => {
                                            return {
                                                filter: vm.filter,
                                                competition: {
                                                    ...vm.competition,
                                                    climbers: vm.filter.type === 'top' ? [...vm.competition.males, ...vm.competition.females] : [...vm.competition.climbers]
                                                }
                                            }
                                        }));
                            })
                        );
                    }));
            }))
    }


}
