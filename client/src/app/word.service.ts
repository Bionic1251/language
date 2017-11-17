import {Word} from "./word.model";
import {WORDS} from "./mock-words";
import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";

import 'rxjs/add/operator/toPromise';
import {reject, resolve} from "q";
import {POS} from "./pos.model";

@Injectable()
export class WordService {
  public readonly USER_ID: number = 1;
  private url = 'http://localhost:8080/';
  words: Word[];
  POSs: POS[];

  constructor(private http: HttpClient) {
    this.words = [];
    //this.POSs = [new POS("adverb"), new POS("noun")];
  }

  addWord(text: string, translation: string): Promise<any> {
    var newUrl = this.url.concat('add_word');
    var data = {text: text, translation: translation, user_id: this.USER_ID};
    return this.http.post(newUrl, data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8')
    })
      .toPromise()
      .catch(this.handleError);
  }

  addAdminWord(text: string, translation: string, posId: number): Promise<any> {
    var newUrl = this.url.concat('add_admin_word');
    var data = {text: text, translation: translation, pos_id: posId};
    return this.http.post(newUrl, data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8')
    })
      .toPromise()
      .catch(this.handleError);
  }

  deleteWord(id: number): Promise<any> {
    var newUrl = this.url.concat('delete_word/', this.USER_ID + "", "/", id + "");
    return this.http.get(newUrl)
      .toPromise()
      .catch(this.handleError);
  }

  getWords(all: boolean = false): Promise<Word[]> {
    var newUrl;
    if (all) {
      newUrl = this.url.concat("get_words/-1");
    } else {
      newUrl = this.url.concat("get_words/" + this.USER_ID);
    }
    return this.http.get(newUrl)
      .toPromise()
      .then(response => {
        this.words = <Word[]>response;
        return this.words;
      })
      .catch(this.handleError);
    //return Promise.resolve(WORDS);
  }

  updateWordPos(id: number, posId: number): Promise<any> {
    var newUrl = this.url.concat('update_word_pos/', id + "", "/", posId + "");
    return this.http.get(newUrl)
      .toPromise()
      .catch(this.handleError);
  }

  getPOSs(): Promise<POS[]> {
    var newUrl = this.url.concat("get_poss/");
    return this.http.get(newUrl)
      .toPromise()
      .then(response => {
        this.POSs = <POS[]>response;
        return this.POSs;
      })
      .catch(this.handleError);
    //return Promise.resolve(this.POSs);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
