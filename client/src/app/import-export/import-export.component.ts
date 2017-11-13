import { Component, OnInit } from '@angular/core';
import {WordService} from "../word.service";

@Component({
  selector: 'app-import-export',
  templateUrl: './import-export.component.html',
  styleUrls: ['./import-export.component.css']
})
export class ImportExportComponent implements OnInit {

  constructor(public wordService: WordService) { }

  ngOnInit() {
  }

}
