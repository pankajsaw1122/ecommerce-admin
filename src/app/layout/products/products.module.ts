import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';
import { ProductsRoutingModule } from './products-routing.module';
import { PageHeaderModule } from '../../shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { MatError } from '@angular/material';
import { AddProductsComponent } from './add-products/add-products.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { UpdateProductComponent } from './update-product/update-product.component';
@NgModule({
    imports: [CommonModule, ProductsRoutingModule, PageHeaderModule, MaterialModule, FormsModule, ReactiveFormsModule ],
    declarations: [AddProductsComponent, ProductsListComponent, UpdateProductComponent],
    entryComponents: [
        UpdateProductComponent
    ],
})
export class ProductsModule {
}
