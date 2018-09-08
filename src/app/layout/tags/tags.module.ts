import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';
import { TagsRoutingModule } from './tags-routing.module';
import { PageHeaderModule } from '../../shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { MatError } from '@angular/material';
import { TagsListComponent } from './tags-list/tags-list.component';
import { AddTagsComponent } from './add-tags/add-tags.component';

@NgModule({
    imports: [CommonModule, TagsRoutingModule, PageHeaderModule, MaterialModule, FormsModule, ReactiveFormsModule ],
    declarations: [TagsListComponent, AddTagsComponent]
})
export class TagsModule {

}
