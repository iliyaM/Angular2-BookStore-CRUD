import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'titleCustomPipe'
})
export class TitleCustomPipePipe implements PipeTransform {

  transform(value: string, args?: any): any {
	// Replaces string with only english characters.
	let newString = value.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
	
	// Capitalizes every first letter of a word
	let capitalized = newString.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
	return capitalized;
  }

}
