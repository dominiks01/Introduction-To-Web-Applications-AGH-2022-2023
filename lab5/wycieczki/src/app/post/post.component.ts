import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { OnInit } from '@angular/core';
import { faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input() data!: Object;

  nick:String =         ""
  tripName:String =     ""
  description:String =  ""
  tripDate:String =     ""
  value:number =        0

  constructor(){}
  faStar = faStar;

  ngOnInit(): void {
    this.nick=          this.data['name' as keyof object];
    this.tripName=      this.data['tripName' as keyof object];
    this.description =  this.data['description' as keyof object];
    this.tripDate =     this.data['startDate' as keyof object];
    this.value =        this.data['rating' as keyof object];
  }

  isGold(value:number){
    return this.value >= value;
  }

}
