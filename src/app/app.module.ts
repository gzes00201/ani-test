import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BbqsAnimationSceneComponent } from './bbqs-animation/bbqs-animation-scene/bbqs-animation-scene.component';
import { BbqsAnimationComponent } from './bbqs-animation/bbqs-animation.component';
import { BbqsAnimationCountdownComponent } from './bbqs-animation/bbqs-animation-countdown/bbqs-animation-countdown.component';
import { BbqsRunTimeKanbanComponent } from './bbqs-animation/bbqs-run-time-kanban/bbqs-run-time-kanban.component';

@NgModule({
  declarations: [
    AppComponent,
    BbqsAnimationSceneComponent,
    BbqsAnimationComponent,
    BbqsAnimationCountdownComponent,
    BbqsRunTimeKanbanComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
