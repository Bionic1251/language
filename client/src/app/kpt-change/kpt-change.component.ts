import {Component, OnInit} from '@angular/core';
import {WordService} from "../word.service";
import {POS} from "../pos.model";
import {Word} from "../word.model";

@Component({
  selector: 'app-kpt-change',
  templateUrl: './kpt-change.component.html',
  styleUrls: ['./kpt-change.component.css']
})
export class KptChangeComponent implements OnInit {
  public currentNoun: Word;
  public currentAdjective: Word;
  public hintEnabled: boolean;
  POSs: POS[];
  words: Word[];
  nouns: Word[];
  adjectives: Word[];
  submitted: boolean;
  correct: boolean;
  wordNumber: number;
  correctWordNumber: number;
  userNoun: string;
  userAdjective: string;

  private vowels: string[] = ["a", "e", "i", "o", "u", "ä", "ö", "y"];

  constructor(private wordService: WordService) {
    this.hintEnabled = false;
    this.words = [];
    this.POSs = [];
    this.currentNoun = new Word('', '');
    this.currentAdjective = new Word('', '');
    this.submitted = false;
    this.correct = false;
    this.wordNumber = 0;
    this.correctWordNumber = 0;
  }

  submit(): void {
    if (this.submitted) {
      this.updateWord();
      return;
    }
    var correctNoun: string = this.transformWord(this.currentNoun.text);
    var correctAdjective: string = this.transformWord(this.currentAdjective.text);
    console.log(this.userNoun);
    console.log(this.userAdjective);
    this.correct = correctNoun == this.userNoun && correctAdjective == this.userAdjective;
    this.submitted = true;
    this.wordNumber += 2;
    if (correctNoun == this.userNoun) {
      this.correctWordNumber++;
    }
    if (correctAdjective == this.userAdjective) {
      this.correctWordNumber++;
    }
  }

  updateWord(): void {
    this.currentNoun = this.getNewWord(this.nouns);
    this.currentAdjective = this.getNewWord(this.adjectives);
    this.correct = false;
    this.submitted = false;
    this.hintEnabled = false;
    this.userNoun = "";
    this.userAdjective = "";
  }

  getNewWord(words: Word[]): Word {
    var randNumber: number = Math.floor(Math.random() * words.length);
    return words[randNumber];
  }

  ngOnInit() {
    this.getWords();
    this.getPOSs();
  }

  initValues(): void {
    if (this.words.length == 0) {
      return;
    }
    if (this.POSs.length == 0) {
      return;
    }
    var nounId: number = this.getPOSId("noun");
    var adjectiveId: number = this.getPOSId("adjective");
    var nouns: Word[] = this.getWordsByPOSId(nounId);
    var adjectives: Word[] = this.getWordsByPOSId(adjectiveId);
    this.nouns = this.getFilteredWords(nouns);
    this.adjectives = this.getFilteredWords(adjectives);
    this.currentNoun = this.getNewWord(this.nouns);
    this.currentAdjective = this.getNewWord(this.adjectives);
  }

  getFilteredWords(words: Word[]): Word[] {
    var newWords: Word[] = [];
    for (let word of words) {
      if (this.vowels.indexOf(this.getLastChar(word.text)) > -1) {
        newWords.push(word);
      }
    }
    return newWords;
  }

  getWordsByPOSId(posId: number): Word[] {
    var newWords: Word[] = [];
    for (let word of this.words) {
      if (word.posId == posId) {
        newWords.push(word);
      }
    }
    return newWords;
  }

  getPOSId(posName: string): number {
    for (let pos of this.POSs) {
      if (pos.name == posName) {
        return pos.id;
      }
    }
    return 0;
  }

  getWords(): void {
    this.wordService.getWords().then(words => {
      this.words = words;
      this.initValues();
    });
  }

  getPOSs(): void {
    this.wordService.getPOSs().then(POSs => {
      this.POSs = POSs;
      this.initValues();
    });
  }

  transformWord(word: string): string {
    if (this.vowels.indexOf(this.getLastChar(word)) <= -1) {
      return "";
    }
    if (this.vowels.indexOf(this.getLastChar(word, 1)) > -1) {
      return word + "n";
    }
    let twoChars: string = word.substr(word.length - 3, 2);
    switch (twoChars) {
      case "tk":
      case "st":
      case "sk":
        return word + "n";
      case "kk":
        return this.replaceChars(word, "k", 2) + "n";
      case "pp":
        return this.replaceChars(word, "p", 2) + "n";
      case "tt":
        return this.replaceChars(word, "t", 2) + "n";
      case "nk":
        return this.replaceChars(word, "ng", 2) + "n"
      case "mp":
        return this.replaceChars(word, "mm", 2) + "n"
      case "nt":
        return this.replaceChars(word, "nn", 2) + "n"
      case "rt":
        return this.replaceChars(word, "rr", 2) + "n"
      case "lt":
        return this.replaceChars(word, "ll", 2) + "n"
    }
    let oneChar: string = this.getLastChar(word, 1);
    switch (oneChar) {
      case "k":
        return this.replaceChars(word, "") + "n";
      case "p":
        return this.replaceChars(word, "v") + "n";
      case "t":
        return this.replaceChars(word, "d") + "n";
    }
    return word + "n";
  }

  replaceChars(str: string, newChars: string, number: number = 1): string {
    return str.substr(0, str.length - 1 - number) + newChars + this.getLastChar(str);
  }

  getLastChar(str: string, offset: number = 0): string {
    return str.charAt(str.length - 1 - offset);
  }
}
