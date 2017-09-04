import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { BooksService} from './shared/services/books.service';
import { BookListComponent } from './components/book-list/book-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogComponent } from './components/dialog/dialog.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import 'hammerjs';
import { MdInputModule, MdButtonModule, MdDialogModule, MdCardModule, MdSliderModule } from '@angular/material';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/share';
import { TitleCustomPipePipe } from './title-custom-pipe.pipe';


@NgModule({
  declarations: [
    AppComponent,
    BookListComponent,
    DialogComponent,
    TitleCustomPipePipe,
  ],
  entryComponents: [
    DialogComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MdInputModule,
    MdButtonModule,
    MdDialogModule,
    MdCardModule,
    MdSliderModule
  ],
  providers: [BooksService],
  bootstrap: [AppComponent]
})
export class AppModule { }
