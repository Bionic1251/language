import {Component, OnInit} from '@angular/core';
import {WordService} from "../word.service";
import {Word} from "../word.model";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  words: Word[];
  wordService: WordService;

  constructor(wordService: WordService) {
    this.words = [];
    this.wordService = wordService;
  }

  getWords(): void {
    this.wordService.getWords().then(words => this.words = words);
  }

  ngOnInit(): void {
    this.getWords();
  }

}
