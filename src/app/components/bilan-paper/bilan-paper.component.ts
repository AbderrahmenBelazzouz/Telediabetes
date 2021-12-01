import { Component, Input, OnInit } from '@angular/core';
import { BilanLipidique } from 'src/app/class/bilan-lipidique';
import { Hba1c } from 'src/app/class/hba1c';
import { Renal } from 'src/app/class/renal';

@Component({
  selector: 'app-bilan-paper',
  templateUrl: './bilan-paper.component.html',
  styleUrls: ['./bilan-paper.component.css']
})
export class BilanPaperComponent implements OnInit {

  @Input() hba1c : Hba1c;
  @Input() renal : Renal;
  @Input() lipid : BilanLipidique;
  @Input() type: string
  constructor() { }

  ngOnInit(): void {
  }

  isHba1c(){
    return this.type=='hba1c'
  }
  isLipidique(){
    return this.type=='lipid'
  }
  isRenal(){
    return this.type=='renal'
  }
  isTerminer(){
    return false;
  }



}
