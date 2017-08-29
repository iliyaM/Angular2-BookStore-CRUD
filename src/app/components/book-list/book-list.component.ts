import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { BooksService} from '../../shared/services/books.service';
import { MdDialog } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})

export class BookListComponent implements OnInit {
books:Array<any>;
error: string;

constructor(private booksService: BooksService, public dialog: MdDialog ) {}

//On init grabs alls books and stores then in array
ngOnInit() {
  this.booksService
    .getBooks()
    .subscribe(
      booksApiData => this.books = booksApiData,
      error => this.error = error.statusText);
}

/*
 * Using service to recive book by id. 
 * Calling the dialog instanse and passing the response as data.
*/
editButtonClicked(id) {
  this.booksService.getSingleBook(id).subscribe(res => {
    let dialogRef = this.dialog.open(DialogComponent, {
      height: '90%',
      width: '600px',
      disableClose: true,
      data: {
        book: res,
        editTemplate: true
      }
  }); 

  dialogRef.afterClosed().subscribe(res => {

  if (res !== undefined) {
    //Loop throught array find matching id and change the values. keeping the id intact.
    for (var i = 0; i < this.books.length; ++i) {
        if (this.books[i].id === id) {
          this.books[i].title = res.title;
          this.books[i].author = res.author;
          this.books[i].year = res.year;
          this.books[i].image = res.thumbnail;
        }
      }
   }
    
   })
  });
}

/*
 * Call dialog with boolean to load diffrent template
*/
createNew() {
     let addDialog = this.dialog.open(DialogComponent, {
       height: '90%',
       width: '600px',
       data: {
          editTemplate: false
       }
     });
    //Gets back result object.
    addDialog.afterClosed().subscribe(res => {

      if (res !== undefined) {
        //Generate random number for unique id
        let randomId = Math.ceil(Math.random()*100);
        //Create an object from response and populate id with generated id
        let object = {
          id: randomId,
          author: res.author,
          title: res.title,
          year: res.year,
          image: res.thumbnail
        };

        //Search books array to find a match to if and store to result 
        let result = this.books.find(book => book.id === randomId);
      
        //Condition result if found a match generate another random id if not push to array books
        if (result = null) {
          this.books.push(object);
        } else {
          object.id = Math.ceil(Math.random()*100);
          this.books.push(object);
        }
      }
    });
}

deleteBook(id) {
  //Find book with the corresponding id and store id
  let book = this.books.find(book => book.id === id);

  //Show confirm prompt with author and title
  if(confirm(`are you sure you want to delete 
  ${book.title} by ${book.author}`)) {

    //Filter out the id and create new array without the deleted book
    let newArray = this.books.filter(book => book.id !== id);
    //Spread to existing array
    this.books = [...newArray];
  }
}

}
