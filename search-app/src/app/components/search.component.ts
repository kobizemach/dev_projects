import { Component } from '@angular/core';
import { BooksService } from '../services/books.service';
import { ActivatedRoute } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogBoxComponent }  from '../dialog-box/dialog-box.component';


@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  providers: [BooksService]
})
export class SearchComponent  {  

    books: any[];
    name: String;
    wishlist: any[] = [];
    check: Boolean;
    page: number;
    search: string;

    
    constructor( 
        public dialog: MatDialog,
        private booksService: BooksService, 
        private _Activatedroute: ActivatedRoute 
        ){
            this.page = 0;
            this.search = "";
            this.getBooks();
    }

    openDialog(wishlist_book: any): void {
        console.log(wishlist_book);
        const dialogRef = this.dialog.open(DialogBoxComponent, {
          autoFocus: false,
          maxHeight: '750px',
          width: '650px',
          data: wishlist_book,
        });

        dialogRef.afterClosed().subscribe(result => {
            if(result){
                this.addToWishList(result);
            }
          });
    }

    ngOnInit() {
        this.page = 0;
        this.name = this._Activatedroute.snapshot.paramMap.get("name");
    }

    searchForBooks(){
        if(this.search){
            this.getBooks();
        }  
    }

    addToWishList(wishlist_book: any){
        this.check = true;
        for(var i = 0; i < this.wishlist.length; i++){
            if(this.wishlist[i].title == wishlist_book.title){
                this.check = false;
                break;
            }
        }
        if(this.check){
            this.wishlist.push(wishlist_book);
        }
    }

    removeFromWishList(index){
        this.wishlist.splice(index, 1);
    }

    prevPage(){
        this.page > 0 ? this.page--:null;
        this.getBooks();
    }
    nextPage() {
        this.page++;
        this.getBooks();
    }

    getBooks() {
        this.booksService.getBooks(this.search,this.page).subscribe(books => {
            this.books = books.items;
        }); 
    }

}
