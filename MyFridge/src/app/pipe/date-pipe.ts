import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cleanDate'
})
export class DatePipe implements PipeTransform {
  
  // Transforme the date in the DB to have a french format
  transform(value: string): string {
    let dateY = value.slice(0, 4);
    let dateM = value.slice(5, 7);
    let dateD = value.slice(8, 10);

    let date = dateD + '-' + dateM + '-' + dateY;
 
    return date;
  }
}