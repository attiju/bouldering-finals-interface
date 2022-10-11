import {Component} from '@angular/core';

@Component({
    selector: 'app-overlay-page',
    template: `
        <div class="min-h-screen bg-[url('/assets/overlay-background.jpg')] bg-cover bg-center flex items-center justify-center">
            <app-leaderboard></app-leaderboard>
        </div>
    `,
    styles: []
})
export class OverlayPageComponent {

}
