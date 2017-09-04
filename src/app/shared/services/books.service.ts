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

}