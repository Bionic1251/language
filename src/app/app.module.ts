import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {TrainingComponent} from './training/training.component';
import {RouterModule} from "@angular/router";
import {DashboardComponent} from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    TrainingComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: 'training', component: TrainingComponent},
      {path: 'dashboard', component: DashboardComponent},
      {path: '', redirectTo: '/dashboard', pathMatch: 'full'}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
