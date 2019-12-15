import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BooksService } from '../services/books.service';

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  providers: [BooksService]
})
export class UserComponent  { 
    
  name: String; 

  constructor(private router: Router,private booksService: BooksService){

    this.name = 'Guest';

  }

  nameCheck(name: string){
    if(name != ''){
        this.router.navigate(['/search/' + name]);
    }else{
        alert("Please fill your name");
    }
  }
}