import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {UserComponent} from "./components/user.component";
import {SearchComponent} from "./components/search.component";

const appRoutes: Routes = [
    {
        path: '',
        component: UserComponent
    },
    {
        path: 'search/:name',
        component: SearchComponent
    }
]

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);