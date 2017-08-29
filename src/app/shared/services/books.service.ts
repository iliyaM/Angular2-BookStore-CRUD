import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Book } from '../interfaces/book';

@Injectable()
export class BooksService {

	private url: string = 'assets/api/books.json';

	constructor( private _http: Http){}

/**
* Get all books
*/
getBooks() {
	return this._http
		.get(this.url)
		.map(res => <Book[]>res.json());
}

/**
* Get specific book
*/
getSingleBook(id: number) {
	return this.getBooks()
		.map(book => book.find(book => book.id === id));
}

/**
* Fomat title: Remove non english characters and Capitalize all first letters in a word
*/
formatString(string) {
	// Replaces string with only english characters.
	let newString = string.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
	// Capitalizes every first letter of a word
	let capitalized = newString.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
	return capitalized;
}

}