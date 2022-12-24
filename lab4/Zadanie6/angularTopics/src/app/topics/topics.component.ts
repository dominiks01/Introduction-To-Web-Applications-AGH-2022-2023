import { Component,EventEmitter,OnInit, Output, ViewChild  } from '@angular/core';
import { DescriptionComponent } from '../description/description.component';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css']
})
export class TopicsComponent implements OnInit {

  @Output() messageEvent = new EventEmitter<string>();

  constructor() { }

  sendMessage(infoValue:string){
    this.messageEvent.emit(infoValue);
  }

  ngOnInit(): void {
  }
}
