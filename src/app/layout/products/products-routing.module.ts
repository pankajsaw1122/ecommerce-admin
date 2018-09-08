import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddProductsComponent } from './add-products/add-products.component';
import { ProductsListComponent } from './products-list/products-list.component';

const routes: Routes = [
    {
        path: 'add-products', component: AddProductsComponent
    },
    {
        path: 'products-list', component: ProductsListComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductsRoutingModule {
}
