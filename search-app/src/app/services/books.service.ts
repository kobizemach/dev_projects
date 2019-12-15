import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class BooksService{

    item_count:number = 20;
    constructor(private http: Http){
        console.log('Books Service intialize');
    }
      
    getBooks(search_string:any, page:number){
        if(search_string == ""){
            search_string = 'classics';
        }
            return this.http.get('https://www.googleapis.com/books/v1/volumes?q='+ search_string +'&maxResults=' + this.item_count + '&startIndex=' + (this.item_count * page) + '&key=AIzaSyAKRjC4-8_LnKA_xf2zkvJOMUOoyy_ujUI')
            .map( res => res.json() );
        
    }

}