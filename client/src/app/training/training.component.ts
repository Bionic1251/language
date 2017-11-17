import {Component, OnInit} from '@angular/core';
import {WordService} from "../word.service";
import {Word} from "../word.model";
import {current} from "codelyzer/util/syntaxKind";
import {log} from "util";

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {
  words: Word[];
  wordService: WordService;
  currentWord: Word;
  submitted: boolean;
  correct: boolean;
  wordNumber: number;
  correctWordNumber: number;
  hintEnabled = false;
  hint: string;
  public userWord: string;

  constructor(wordService: WordService) {
    this.words = [];
    this.wordService = wordService;
    this.currentWord = new Word('', '');
    this.submitted = false;
    this.correct = false;
    this.wordNumber = 0;
    this.correctWordNumber = 0;
    this.hintEnabled = false;
    this.userWord = "";
  }

  getWords(): void {
    this.wordService.getWords().then(words => {
      this.words = words;
      this.updateWord();
    });
  }

  ngOnInit(): void {
    this.getWords();
  }

  updateWord(): void {
    var randNumber: number = Math.floor(Math.random() * this.words.length);
    this.currentWord = this.words[randNumber];
    this.correct = false;
    this.submitted = false;
    this.hintEnabled = false;
    this.userWord = "";
  }

  submit(): void {
    if (this.submitted) {
      this.updateWord();
      return;
    }
    this.correct = this.userWord == this.currentWord.text;
    this.submitted = true;
    this.wordNumber++;
    if (this.correct) {
      this.correctWordNumber++;
    }
  }

  showHint(): boolean {
    this.hint = this.shuffleString(this.currentWord.text);
    this.hintEnabled = true;
    return false;
  }

  shuffleString(str: string): string {
    for (let i = str.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      if (i == j) {
        continue;
      }
      str = str.substr(0, j) + str.substr(i, 1) + str.substr(j + 1, i - j - 1) + str.substr(j, 1) + str.substr(i + 1);
    }
    return str;
  }
}
