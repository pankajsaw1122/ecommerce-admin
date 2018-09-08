import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { AddCategoriesComponent } from './add-categories/add-categories.component';


const routes: Routes = [
    {
        path: 'add-categories', component: AddCategoriesComponent
    },
    {
        path: 'categories-list', component: CategoriesListComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CategoriesRoutingModule {
}
