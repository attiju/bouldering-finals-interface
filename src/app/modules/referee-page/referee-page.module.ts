import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { RefereePageComponent } from './components/referee-page/referee-page.component';
import {SharedModule} from "../shared/shared.module";


@NgModule({
    declarations: [
    RefereePageComponent
  ],
    imports: [
        CommonModule,
        SharedModule
    ]
})
export class RefereePageModule {
}
