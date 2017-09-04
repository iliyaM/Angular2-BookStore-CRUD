import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemBooksService implements InMemoryDbService {
  createDb() {
    let books = [
		  {
		    "id": 1,
		    "title":"do you even lift bro",
		    "author":"Bain the Pain",
		    "year": "2001-11-2",
		    "image": "bain"
		  },
		    {
		    "id": 2,
		    "title":"i am awesome",
		    "author":"Batman",
		    "year": "2001-11-2",
		    "image": "batman2"
		  },
		    {
		    "id": 3,
		    "title":"Why so serious",
		    "author": "Ha Ha Ha",
		    "year": "2001-11-2",
		    "image": "joker"
		  },
		    {
		    "id": 4,
		    "title":"Na na na its batman",
		    "author":"Batman",
		    "year": "2001-11-2",
		    "image": "batman"
		  }
	]
    return {books};
  }
}