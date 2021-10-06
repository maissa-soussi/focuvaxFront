import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { path } from '../VariablesGlobales';

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.css']
})
export class CvComponent implements OnInit {
 id:any;
 lie: String = path + "candidats/cv/";
  constructor(private _Activatedroute: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this._Activatedroute.snapshot.paramMap.get("id");
  }

}
