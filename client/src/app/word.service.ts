import {Word} from "./word.model";
import {WORDS} from "./mock-words";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

import 'rxjs/add/operator/toPromise';
import {reject, resolve} from "q";

@Injectable()
export class WordService {
  private url = 'http://localhost:8080/';
  words: Word[];

  constructor(private http: HttpClient) {
    this.words = [];
  }

  addWord(text: string, translation: string): void {
    var newUrl = this.url.concat('add_word/', text, '/', translation);
    this.http.get(newUrl)
      .toPromise()
      .then(response => console.log(response))
      .catch(this.handleError);
  }

  deleteWord(id: number): void {
    var newUrl = this.url.concat('delete_word/', id + "");
    this.http.get(newUrl)
      .toPromise()
      .then(response => console.log(response))
      .catch(this.handleError);
  }

  getWords(): Promise<Word[]> {
    var newUrl = this.url.concat("get_words");
    return this.http.get(newUrl)
      .toPromise()
      .then(response => {
        this.words = <Word[]>response;
        return this.words;
      })
      .catch(this.handleError);
    //return Promise.resolve(WORDS);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
