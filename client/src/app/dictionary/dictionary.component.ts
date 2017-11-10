import {Component, OnInit} from '@angular/core';
import {WordService} from "../word.service";
import {Word} from "../word.model";


@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.component.html',
  styleUrls: ['./dictionary.component.css']
})
export class DictionaryComponent implements OnInit {
  words: Word[];

  constructor(public wordService: WordService) {
    this.words = [];
  }

  deleteWord(id: number): void {
    console.log("id " + id);
    this.wordService.deleteWord(id).then(() => this.getWords());
  }

  getWords(): void {
    this.wordService.getWords().then(words => {
      this.words = words;
    });
  }

  ngOnInit() {
    this.getWords();
  }

  submitWord(textInput: HTMLInputElement, translationInput: HTMLInputElement): boolean {
    this.wordService.addWord(textInput.value, translationInput.value)
      .then(() => this.getWords());
    textInput.value = "";
    translationInput.value = "";
    return false;
  }
}
