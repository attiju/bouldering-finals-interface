import { Injectable } from '@angular/core';
import {Observable, of, share, shareReplay, Subject} from "rxjs";
import {Competition} from "../models/competition";
import {HttpClient} from "@angular/common/http";
import {Options} from "../models/options";

const TEST_COMP: Competition = {
  id: 'comp-0',
  rules: {
    boulders: {
      males: 2,
      females: 2
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
          top: { done: false, tries: 4 },
          zone: { done: true, tries: 2 }
        },
        {
          top: { done: false, tries: 0 },
          zone: { done: false, tries: 0 }
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
      this.competition$ = of(TEST_COMP)
          .pipe(shareReplay({ bufferSize: 1, refCount: true }))
    }

    return this.competition$;
  }

}
