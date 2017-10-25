import {Component, OnInit} from '@angular/core';
import {WordService} from "../word.service";
import {Word} from "../word.model";
import {current} from "codelyzer/util/syntaxKind";

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

  constructor(wordService: WordService) {
    this.words = [];
    this.wordService = wordService;
    this.currentWord = new Word('', '');
    this.submitted = false;
    this.correct = false;
    this.wordNumber = 0;
    this.correctWordNumber = 0;
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
  }

  submit(word: string): void {
    this.correct = word == this.currentWord.word;
    this.submitted = true;
    this.wordNumber++;
    if (this.correct) {
      this.correctWordNumber++;
    }
  }
}
