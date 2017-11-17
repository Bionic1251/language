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
import { ImportExportComponent } from './import-export/import-export.component';
import { KptChangeComponent } from './kpt-change/kpt-change.component';
import { AdminWordEditorComponent } from './admin-word-editor/admin-word-editor.component';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    TrainingComponent,
    DashboardComponent,
    WordSelectionComponent,
    DictionaryComponent,
    ImportExportComponent,
    KptChangeComponent,
    AdminWordEditorComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot([
      {path: 'training', component: TrainingComponent},
      {path: 'dashboard', component: DashboardComponent},
      {path: 'text-selection', component: WordSelectionComponent},
      {path: 'import-export', component: ImportExportComponent},
      {path: 'kpt-change', component: KptChangeComponent},
      {path: 'dictionary', component: DictionaryComponent},
      {path: 'admin-word-editor', component: AdminWordEditorComponent},
      {path: '', redirectTo: '/dashboard', pathMatch: 'full'}
    ]),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
