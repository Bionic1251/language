import {Component, OnInit} from '@angular/core';
import {WordService} from "../word.service";
import {Word} from "../word.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  words: Word[];
  wordService: WordService;

  constructor(wordService: WordService, private router: Router) {
    this.words = [];
    this.wordService = wordService;
  }

  getWords(): void {
    this.wordService.getWords().then(response => this.words = <Word[]>response);
  }

  ngOnInit(): void {
    this.getWords();
  }

  navigate(): void {
    this.router.navigate(['/training']);
  }
}
