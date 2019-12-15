import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MatDialogModule } from "@angular/material/dialog";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { SearchComponent }  from './components/search.component';
import { UserComponent }  from './components/user.component';
import { DialogBoxComponent }  from '../app/dialog-box/dialog-box.component';

import { routing }  from './app.routing';

@NgModule({
  declarations: [
    AppComponent, SearchComponent, UserComponent, DialogBoxComponent
  ],
  imports: [
    BrowserModule, FormsModule, routing, HttpModule, MatDialogModule, BrowserAnimationsModule
  ],
  entryComponents: [
    DialogBoxComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
