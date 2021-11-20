import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BbqsAnimationSceneComponent } from './bbqs-animation/bbqs-animation-scene/bbqs-animation-scene.component';
import { BbqsAnimationComponent } from './bbqs-animation/bbqs-animation.component';
import { BbqsAnimationCountdownComponent } from './bbqs-animation/bbqs-animation-countdown/bbqs-animation-countdown.component';
import { BbqsRunTimeKanbanComponent } from './bbqs-animation/bbqs-run-time-kanban/bbqs-run-time-kanban.component';
import { BbqsRankMapComponent } from './bbqs-animation/bbqs-rank-map/bbqs-rank-map.component';
import { BbqsCurrentRankComponent } from './bbqs-animation/bbqs-current-rank/bbqs-current-rank.component';

@NgModule({
  declarations: [
    AppComponent,
    BbqsAnimationSceneComponent,
    BbqsAnimationComponent,
    BbqsAnimationCountdownComponent,
    BbqsRunTimeKanbanComponent,
    BbqsRankMapComponent,
    BbqsCurrentRankComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
