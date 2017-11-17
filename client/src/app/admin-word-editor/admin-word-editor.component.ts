import {Component, OnInit} from '@angular/core';
import {Word} from "../word.model";
import {WordService} from "../word.service";
import {POS} from "../pos.model";

@Component({
  selector: 'app-admin-word-editor',
  templateUrl: './admin-word-editor.component.html',
  styleUrls: ['./admin-word-editor.component.css']
})
export class AdminWordEditorComponent implements OnInit {
  words: Word[];
  POSs: POS[];

  constructor(public wordService: WordService) {
    this.words = [];
    this.POSs = [];
  }

  ngOnInit() {
    this.getWords();
    this.getPOSs();
  }

  getWords(): void {
    this.wordService.getWords(true).then(words => {
      this.words = words;
    });
  }

  getPOSs(): void {
    this.wordService.getPOSs().then(POSs => {
      this.POSs = POSs;
    });
  }

  select(wordId: number, posId: number): void {
    this.wordService.updateWordPos(wordId, posId).then(() => console.log("done"));
  }

  submitWord(textInput: HTMLInputElement, translationInput: HTMLInputElement, posId: string): boolean {
    this.wordService.addAdminWord(textInput.value, translationInput.value, parseInt(posId))
      .then(() => this.getWords());
    textInput.value = "";
    translationInput.value = "";
    return false;
  }
}
