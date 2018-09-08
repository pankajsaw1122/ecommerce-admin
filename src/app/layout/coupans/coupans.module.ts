import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoupansRoutingModule } from './coupans-routing.module';
import { PageHeaderModule } from './../../shared';
import { CoupansListComponent } from './coupans-list/coupans-list.component';
import { AddCoupansComponent } from './add-coupans/add-coupans.component';

@NgModule({
    imports: [CommonModule, CoupansRoutingModule, PageHeaderModule],
    declarations: [CoupansListComponent, AddCoupansComponent]
})
export class CoupansModule {
}
