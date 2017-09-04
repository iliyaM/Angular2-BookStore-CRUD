import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
@Input() book = this.book;
@Output() editButtonEmitter:EventEmitter<number> = new EventEmitter<number>();
@Output() deleteButtonEmitter:EventEmitter<number> = new EventEmitter<number>();


editButtonClicked(id):void {
	this.editButtonEmitter.emit(id);
}

deleteBook(id):void {
	this.deleteButtonEmitter.emit(id);
}

  constructor() { }

  ngOnInit() {
  }

}
