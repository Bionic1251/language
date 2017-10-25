import {Word} from "./word.model";
import {WORDS} from "./mock-words";
import {Injectable} from "@angular/core";

@Injectable()
export class WordService {
  getWords(): Promise<Word[]> {
    return Promise.resolve(WORDS);
  }
}
