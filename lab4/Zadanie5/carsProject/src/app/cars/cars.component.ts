import { Component, OnInit } from '@angular/core';
import { __values } from 'tslib';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css'],
})
export class CarsComponent implements OnInit {
  constructor() { }

  selectedCompany!: string;
  selectedModel!: string;
  selectedColor!: string;
  carData: any;
  colorChoose!: string[];
  equipment!: string[];

  showColors = false;
  showCompanies = false;
  showModels = false;
  showCar = false;

  enumToString(colorName: any): string{
      switch(colorName){
        case "Czarny":      return "black";
        case "Srebrny":     return "silver";
        case "Szary":       return "gray";
        case "Biały":       return "white";
        case "Niebieski":   return "blue";
        case "Czerwony":    return "red";
        case "Brązowy":     return "brown";
        case "Beżowy":      return "beige";
        case "Złoty":       return "gold";
        case "Zielony":     return "green";
        case "Żółty":       return "yellow";
        default: return "";
    }
  }

  ngOnInit(): void {
    fetch('./assets/cars.json')
      .then((res) => res.json())
      .then((json) => {
        this.carData = json;
        this.showCompanies = true;
      });
  }

  chosenCompany() {
    this.showModels = true;
    this.showCar = false;
    this.showColors = false;
  }

  chosenModel() {
    this.showColors = true;
    this.colorChoose = String(
      Object.values(this.carData[this.selectedCompany][this.selectedModel][0])
    ).split(',');
    this.showCar = false;
  }

  chosenColor() {
    this.showCar = true;
    this.equipment = String( Object.values(
      this.carData[this.selectedCompany][this.selectedModel][1]
    )).split(',');
  }
}
