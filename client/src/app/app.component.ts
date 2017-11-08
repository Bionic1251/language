import {Component} from '@angular/core';
import {Word} from './word.model'
import {WordService} from "./word.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [WordService]
})
export class AppComponent {

}
