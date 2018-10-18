import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';
import { CategoriesRoutingModule } from './categories-routing.module';
import { PageHeaderModule } from '../../shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { MatError } from '@angular/material';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { AddCategoriesComponent } from './add-categories/add-categories.component';

@NgModule({
    imports: [CommonModule, CategoriesRoutingModule, PageHeaderModule, MaterialModule, FormsModule, ReactiveFormsModule ],
    declarations: [CategoriesListComponent, AddCategoriesComponent],
})
export class CategoriesModule {
}
