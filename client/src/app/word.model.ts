export class Word {
  id: number;
  text: string;
  translation: string;

  constructor(word: string, translation: string) {
    this.text = word;
    this.translation = translation;
  }
}
