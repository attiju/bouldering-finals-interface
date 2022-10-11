import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RefereePageComponent} from './components/referee-page/referee-page.component';
import {SharedModule} from "../shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
    declarations: [
        RefereePageComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        ReactiveFormsModule,
        FormsModule
    ]
})
export class RefereePageModule {
}
