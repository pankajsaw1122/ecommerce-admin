import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoupansListComponent } from './coupans-list/coupans-list.component';
import { AddCoupansComponent } from './add-coupans/add-coupans.component';

const routes: Routes = [
    {
        path: 'coupans-list', component: CoupansListComponent
    },
    {
        path: 'add-coupans', component: AddCoupansComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CoupansRoutingModule {
}
