import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomePageModule} from "./modules/home-page/home-page.module";
import {OverlayPageModule} from "./modules/overlay-page/overlay-page.module";
import {RefereePageModule} from "./modules/referee-page/referee-page.module";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HomePageModule,
        OverlayPageModule,
        RefereePageModule,
        HttpClientModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
