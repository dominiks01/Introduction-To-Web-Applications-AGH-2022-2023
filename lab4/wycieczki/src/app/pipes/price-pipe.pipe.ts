import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pricePipe'
})
export class PricePipePipe implements PipeTransform {

  transform(value: String, ...args: unknown[]): String {
    return "Cena jednostkowa: "+ value + " zł";
  }

}
