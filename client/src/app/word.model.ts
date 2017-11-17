export class Word {
  id: number;
  text: string;
  translation: string;
  posId: number;

  constructor(word: string, translation: string, posId: number = null) {
    this.text = word;
    this.translation = translation;
    this.posId = posId;
  }
}
