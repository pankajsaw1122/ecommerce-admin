import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TagsListComponent } from './tags-list/tags-list.component';
import { AddTagsComponent } from './add-tags/add-tags.component';

const routes: Routes = [
    {
        path: 'tags-list', component: TagsListComponent
    },
    {
        path: 'add-tags', component: AddTagsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TagsRoutingModule {
}
