import {Component, OnInit} from '@angular/core';
import {map, Observable, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Climber, Competition} from "../../../../models/competition";
import {environment} from "../../../../../environments/environment";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'app-referee-page',
    template: `
        <div class="w-screen h-screen bg-gray-500 flex flex-col text-gray-200">
            <div class="px-8 py-8 shadow relative">
                <h1 class="text-center text-xl">Grimpeurs</h1>
                <div class="absolute right-8 top-1/2 bottom-0 -translate-y-1/2">
                    <button class="bg-green-300 hover:bg-green-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
                            (click)="climberAddModalOpen = true">+
                    </button>
                </div>
            </div>
            <div class="flex-1 bg-gray-100 overflow-auto px-4 py-8">
                <ng-container *ngIf="vm$ | async as competition">
                    <div *ngFor="let climber of climbers; let climberIndex = index"
                         class="bg-gray-400 rounded mb-4 overflow-hidden shadow">
                        <div class="w-full text-center text-lg px-8 py-8 relative">
                            {{ climber.firstname | titlecase }} {{ climber.lastname | uppercase }}
                            <div class="absolute right-8 top-1/2 bottom-0 -translate-y-1/2">
                                <button class="bg-red-300 hover:bg-red-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center" (click)="removeClimber(climber)">-</button>
                            </div>
                        </div>
                        <div class="bg-gray-200 text-black p-4">
                            <div *ngFor="let boulder of climber.boulders; let boulderIndex = index; let last = last">
                                <div>Bloc n° {{ boulderIndex + 1 }}</div>
                                <div class="flex flex-col">
                                    <div>Top {{ boulder.top.done ? 'validé' : 'non validé' }} ({{ boulder.top.tries }})
                                    </div>
                                    <div>Zone {{ boulder.zone.done ? 'validé' : 'non validé' }} ({{ boulder.zone.tries }})
                                    </div>
                                </div>
                                <div class="p-4">
                                    <button [disabled]="boulder.top.done" (click)="onAddTry(climber, boulderIndex)"
                                            class="disabled:opacity-50 disabled:bg-gray-300 w-3/4 mb-4 bg-red-300 hover:bg-red-400 text-white font-bold py-2 px-4 rounded inline-flex justify-center items-center">
                                        ESSAI
                                    </button>
                                    <button [disabled]="boulder.zone.done" (click)="onAddZone(climber, boulderIndex)"
                                            class="disabled:opacity-50 disabled:bg-gray-300 w-3/4 mb-4 bg-orange-300 hover:bg-orange-400 text-white font-bold py-2 px-4 rounded inline-flex justify-center items-center">
                                        ZONE
                                    </button>
                                    <button [disabled]="boulder.top.done" (click)="onAddTop(climber, boulderIndex)"
                                            class="disabled:opacity-50 disabled:bg-gray-300 w-3/4 mb-4 bg-green-300 hover:bg-green-400 text-white font-bold py-2 px-4 rounded inline-flex justify-center items-center">
                                        TOP
                                    </button>
                                    <button (click)="reinit(climber, boulderIndex)"
                                            class="disabled:opacity-50 disabled:bg-gray-300 w-3/4 mb-4 bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded inline-flex justify-center items-center">
                                        RESET
                                    </button>
                                </div>
                                <div *ngIf="!last"
                                     class="pt-4 mt-4 space-y-2 border-t border-gray-200 dark:border-gray-700"></div>
                            </div>
                        </div>
                    </div>
                </ng-container>
            </div>
        </div>

        <div class="fixed top-0 right-0 bottom-0 left-0 flex flex-row" *ngIf="climberAddModalOpen">
            <div class="flex-1 h-full bg-gray-500 opacity-50" (click)="climberAddModalOpen = false">

            </div>

            <div class="h-full px-8 bg-white flex flex-col justify-center items-center">
                <form *ngIf="newClimber" [formGroup]="newClimber" (ngSubmit)="onNewClimberFormSubmit()">
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="firstname">
                            Prénom
                        </label>
                        <input [formControlName]="'firstname'"
                               class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                               id="firstname" type="text">
                    </div>
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="lastname">
                            Nom
                        </label>
                        <input [formControlName]="'lastname'"
                               class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                               id="lastname" type="text">
                    </div>
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="gender">
                            Sexe
                        </label>
                        <div class="relative">
                            <select [formControlName]="'gender'"
                                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="gender">
                                <option [value]="'male'">Homme</option>
                                <option [value]="'female'">Femme</option>
                            </select>
                            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg"
                                     viewBox="0 0 20 20">
                                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div class="mt-8 w-full flex justify-center items-center">
                        <button class="w-full bg-green-300 hover:bg-green-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center text-center">
                            Ajouter un grimpeur
                        </button>
                    </div>
                </form>
            </div>
        </div>
    `,
    styles: []
})
export class RefereePageComponent implements OnInit {

    public climberAddModalOpen = false;
    public vm$?: Observable<any>;
    public newClimber?: FormGroup;
    public climbers?: Climber[];

    constructor(
        private http: HttpClient,
        private fb: FormBuilder,
    ) {
    }

    ngOnInit(): void {
        this.initNewClimberForm();
        this.loadCompetition();
    }

    private loadCompetition(): void {
        this.vm$ = this.http.get<Competition>(`${environment.api}/competitions/${environment.competitionId}`)
            .pipe(map(competition => {
                    return {
                        ...competition,
                        climbers: competition.climbers
                            .sort((c1, c2) => (c1.firstname + c1.lastname).localeCompare(c2.firstname + c2.lastname))
                    }
                }),
                tap(competition => {
                    this.climbers = competition.climbers;
                }));
    }

    private initNewClimberForm(): void {
        this.newClimber = this.fb.group({
            firstname: this.fb.control('', [Validators.required]),
            lastname: this.fb.control('', [Validators.required]),
            gender: this.fb.control('male', [Validators.required])
        });
    }

    public onNewClimberFormSubmit(): void {
        if (this.newClimber && this.newClimber.valid) {
            this.http.post<any>(`${environment.api}/competitions/${environment.competitionId}/climbers`, this.newClimber.value)
                .subscribe(_ => {
                    this.loadCompetition();
                    this.initNewClimberForm();
                });
        }
    }

    onAddTry(climber: Climber, boulderIndex: number) {
        this.http.put<Climber>(`${environment.api}/competitions/${environment.competitionId}/climbers/${climber.id}`, climber.boulders.map((b, i) => {
            if (i != boulderIndex) return b;
            return {
                top: {done: b.top.done, tries: b.top.done ? b.top.tries : b.top.tries + 1},
                zone: {done: b.zone.done, tries: b.zone.done ? b.zone.tries : b.zone.tries + 1}
            };
        })).subscribe(x => climber.boulders = x.boulders);
    }

    onAddZone(climber: Climber, boulderIndex: number) {
        this.http.put<Climber>(`${environment.api}/competitions/${environment.competitionId}/climbers/${climber.id}`, climber.boulders.map((b, i) => {
            if (i != boulderIndex) return b;
            return {top: {done: false, tries: b.top.tries + 1}, zone: {done: true, tries: b.zone.tries + 1}};
        })).subscribe(x => climber.boulders = x.boulders);
    }

    onAddTop(climber: Climber, boulderIndex: number) {
        this.http.put<Climber>(`${environment.api}/competitions/${environment.competitionId}/climbers/${climber.id}`, climber.boulders.map((b, i) => {
            if (i != boulderIndex) return b;
            return {top: {done: true, tries: b.top.tries + 1}, zone: { done: true, tries: b.zone.done ? b.zone.tries : b.zone.tries + 1 }};
        })).subscribe(x => climber.boulders = x.boulders);
    }

    reinit(climber: Climber, boulderIndex: number) {
        this.http.put<Climber>(`${environment.api}/competitions/${environment.competitionId}/climbers/${climber.id}`, climber.boulders.map((b, i) => {
            return {top: {done: false, tries: 0}, zone: {done: false, tries: 0}};
        })).subscribe(x => climber.boulders = x.boulders);
    }

    removeClimber(climber: Climber) {
        this.http.delete<void>(`${environment.api}/competitions/${environment.competitionId}/climbers/${climber.id}`)
            .subscribe(() => this.climbers = this.climbers?.filter(c => c.id !== climber.id));
    }
}
