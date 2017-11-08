import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http'
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {TrainingComponent} from './training/training.component';
import {RouterModule} from "@angular/router";
import {DashboardComponent} from './dashboard/dashboard.component';
import {WordSelectionComponent} from './word-selection/word-selection.component';
import {DictionaryComponent} from './dictionary/dictionary.component';

@NgModule({
  declarations: [
    AppComponent,
    TrainingComponent,
    DashboardComponent,
    WordSelectionComponent,
    DictionaryComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot([
      {path: 'training', component: TrainingComponent},
      {path: 'dashboard', component: DashboardComponent},
      {path: 'text-selection', component: WordSelectionComponent},
      {path: 'dictionary', component: DictionaryComponent},
      {path: '', redirectTo: '/dashboard', pathMatch: 'full'}
    ]),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
