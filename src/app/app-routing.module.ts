import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomePageComponent} from "./modules/home-page/components/home-page/home-page.component";
import {RefereePageComponent} from "./modules/referee-page/components/referee-page/referee-page.component";
import {OverlayPageComponent} from "./modules/overlay-page/components/overlay-page/overlay-page.component";

const routes: Routes = [
    {
        path: 'competition',
        children: [
            {
                path: '',
                component: HomePageComponent
            },
            {
                path: 'referee',
                component: RefereePageComponent
            },
            {
                path: 'overlay',
                component: OverlayPageComponent
            }
        ]
    },
    {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'competition'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
