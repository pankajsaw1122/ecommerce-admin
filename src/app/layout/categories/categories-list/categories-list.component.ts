import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { ApiService } from '../../../shared/services/api.service';
@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss'],
  animations: [routerTransition()]

})
export class CategoriesListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
