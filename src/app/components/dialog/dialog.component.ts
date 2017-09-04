import { Component, OnInit, Inject } from '@angular/core';
import {MD_DIALOG_DATA, MdDialogRef} from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { BooksService} from '../../shared/services/books.service';
import { Book } from '../../shared/interfaces/book';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

reactiveForm: FormGroup;
authorError: string;
titleError: string;
yearError: string;
books:Array<Book>;
error: string;

isEditTemplate:boolean = this.data.editTemplate;

constructor (
	@Inject(MD_DIALOG_DATA) public data: any,
	public dialogRef:MdDialogRef<DialogComponent>,
	private fb: FormBuilder,
	private booksService: BooksService) {}

ngOnInit() {
	// build the data model
	this.buildForm();

	// Subscribe to books
	this.booksService
		.getBooks().subscribe(res => this.books = res);

	//Set up initial value for thumbnail if in edit mode.
	if (this.isEditTemplate) {
			this.thumbnail = this.data.book.image;
		}
}

/**
* build the initial form
*/
buildForm(){
	this.reactiveForm = this.fb.group({
		'author': [null, Validators.required],
		'title': ['', Validators.compose([Validators.required, Validators.pattern('[\\w\\-\\s\\/]+')])],
		'year': [null, Validators.compose([Validators.required, Validators.pattern(/^(\d?\d?\d?\d)\-(0?\d|1[12])\-(0?[1-9]|[12]\d|3[01])$/)])],
		'thumbnail': new FormControl()
	});

	// set initial value if edit template
	if (this.isEditTemplate) {
		this.reactiveForm.patchValue({
			author: this.data.book.author,
			title: this.data.book.title,
			year: this.data.book.year,
			thumbnail: this.thumbnail
		});
	}
	// watch for changes and validate
	this.reactiveForm.valueChanges.subscribe(data => this.validateForm());
}


validateForm() {
	this.authorError = '';
	this.titleError = '';
	this.yearError = '';

	let author = this.reactiveForm.get('author');
	let title = this.reactiveForm.get('title');
	let year = this.reactiveForm.get('year');


	if (author.invalid && author.dirty) {
		this.authorError = 'Author is required';
	}

	//Runs and checks if title exists
	if (!this.isEditTemplate) {
		let result = this.books.filter((book) => book.title.toLowerCase().trim() === title.value.toLowerCase().trim());
		if (result.length >= 1) {
			title.setErrors({titleValid: true});
		}
	}

	if (title.invalid && title.dirty) {
		if (title.errors['required']) {
			this.titleError = 'The title is required';
		}
		if (title.errors['titleValid']) {
			this.titleError = 'This title allready exists';
		}
		if (title.errors['pattern']) {
			this.titleError = 'No special characters are allowed'
		}
	}

	//Setting up error messages for year
	if (year.invalid && year.dirty) {	
		if (year.invalid && year.dirty) {
			this.yearError = 'Please specify time';
		}
		if (year.errors['pattern']) {
			this.yearError = 'Time should be in valid time format 00:00 to 23:59';
		}
	}
}


thumbnails:Array<string> = ['batman','bain','batman2','catwoman','joker','lexluthor'];
thumbnail:string = 'batman';


//Select value by value from slider and populate thumbnail variable with name.
//Patch value of hidden input with value from thumbnail variable.
onInputChange(event: any) {
	this.thumbnail = this.thumbnails[event.value];
	this.reactiveForm.patchValue({
		thumbnail: this.thumbnail
	});
}

// On confirm pass the object from ng submit to dialog
onSubmit(value: any) {
	this.dialogRef.close(value);
}

}
