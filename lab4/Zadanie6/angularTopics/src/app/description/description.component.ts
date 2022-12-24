import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class DescriptionComponent implements OnInit{

  constructor() { }

  ngOnInit(): void {
  }

  chosenBasics :boolean = false;
  chosenComponents :boolean = false;
  chosenEvents :boolean = false;

  receiveMessage($event:any){
    switch($event){
      case "chosenBasics":
        this.chosenBasics = true; this.chosenComponents = false; this.chosenEvents = false;
        break;
      case "chosenComponents":
        this.chosenBasics = false; this.chosenComponents = true; this.chosenEvents = false;
        break;
      case "chosenEvents":
        this.chosenBasics = false; this.chosenComponents = false; this.chosenEvents = true  ;
        break;
    }
  }
}
