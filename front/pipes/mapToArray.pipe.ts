import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name: 'mapToArray'})
export class MapToArrayPipe implements PipeTransform {
  transform(value, args:string[]) : any {
    let arr = [];
    for (const key in value) {
      arr.push({key: key, value: value[key]});
    }
    return arr;
  }
}