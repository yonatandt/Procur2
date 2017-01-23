import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'keys'
})
export class keysPipe implements PipeTransform {

	transform(value, args:string[]): any {
		let keys = [];
		for(let key in value) {
			keys.push(key);
		}
		return keys;
	}
}