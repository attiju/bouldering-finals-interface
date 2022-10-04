import {Injectable} from '@angular/core';
import {Observable, of, shareReplay, switchMap, timer} from "rxjs";
import {Competition} from "../models/competition";
import {HttpClient} from "@angular/common/http";
import {Options} from "../models/options";

const TEST_COMP: Competition = {
    id: 'comp-0',
    rules: {
        boulders: {
            males: 4,
            females: 4
        }
    },
    climbers: [
        {
            id: 'climber-0',
            firstname: 'jules',
            lastname: 'attivissimo',
            gender: 'male',
            boulders: [
                {
                    top: {done: true, tries: 4},
                    zone: {done: true, tries: 2}
                },
                {
                    top: {done: false, tries: 1},
                    zone: {done: true, tries: 1}
                },
                {
                    top: {done: false, tries: 0},
                    zone: {done: false, tries: 0}
                },
                {
                    top: {done: false, tries: 0},
                    zone: {done: false, tries: 0}
                }
            ]
        },
        {
            id: 'climber-0',
            firstname: 'jules',
            lastname: 'aze',
            gender: 'male',
            boulders: [
                {
                    top: {done: false, tries: 4},
                    zone: {done: true, tries: 3}
                },
                {
                    top: {done: false, tries: 0},
                    zone: {done: false, tries: 0}
                },
                {
                    top: {done: false, tries: 0},
                    zone: {done: false, tries: 0}
                },
                {
                    top: {done: false, tries: 0},
                    zone: {done: false, tries: 0}
                }
            ]
        },
        {
            id: 'climber-0',
            firstname: 'a',
            lastname: 'a',
            gender: 'male',
            boulders: [
                {
                    top: {done: false, tries: 4},
                    zone: {done: true, tries: 2}
                },
                {
                    top: {done: false, tries: 4},
                    zone: {done: false, tries: 4}
                },
                {
                    top: {done: false, tries: 0},
                    zone: {done: false, tries: 0}
                },
                {
                    top: {done: false, tries: 0},
                    zone: {done: false, tries: 0}
                }
            ]
        },
        {
            id: 'climber-0',
            firstname: 'juaazeaezaezles',
            lastname: 'attivissimo',
            gender: 'male',
            boulders: [
                {
                    top: {done: false, tries: 4},
                    zone: {done: true, tries: 2}
                },
                {
                    top: {done: false, tries: 0},
                    zone: {done: false, tries: 0}
                },
                {
                    top: {done: false, tries: 0},
                    zone: {done: false, tries: 0}
                },
                {
                    top: {done: false, tries: 0},
                    zone: {done: false, tries: 0}
                }
            ]
        },
        {
            id: 'climber-0',
            firstname: 'jules',
            lastname: 'attivissimo',
            gender: 'male',
            boulders: [
                {
                    top: {done: false, tries: 4},
                    zone: {done: true, tries: 2}
                },
                {
                    top: {done: false, tries: 0},
                    zone: {done: false, tries: 0}
                },
                {
                    top: {done: false, tries: 0},
                    zone: {done: false, tries: 0}
                },
                {
                    top: {done: false, tries: 0},
                    zone: {done: false, tries: 0}
                }
            ]
        },
        {
            id: 'climber-1',
            firstname: 'jules',
            lastname: 'attivissimo',
            gender: 'male',
            boulders: [
                {
                    top: {done: false, tries: 4},
                    zone: {done: true, tries: 2}
                },
                {
                    top: {done: false, tries: 0},
                    zone: {done: false, tries: 0}
                },
                {
                    top: {done: false, tries: 0},
                    zone: {done: false, tries: 0}
                },
                {
                    top: {done: false, tries: 0},
                    zone: {done: false, tries: 0}
                }
            ]
        }
    ]
}

@Injectable({
    providedIn: 'root'
})
export class CompetitionService {

    private competition$?: Observable<Competition>;

    constructor(http: HttpClient) {
    }

    public getCompetition(options?: Options): Observable<Competition> {
        if (!this.competition$ || options?.forceReload) {

            // TODO this should be an http call
            this.competition$ = timer(0, 30000)
                .pipe(switchMap(x => of({
                    ...TEST_COMP,
                    climbers: [...TEST_COMP.climbers].filter(c => c.gender == ((x & 1) ? 'male' : 'female'))
                }).pipe(
                    shareReplay({bufferSize: 1, refCount: true})
                )));
        }

        return this.competition$;
    }

}
