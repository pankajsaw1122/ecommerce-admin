import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { ApiService } from '../../../shared/services/api.service';

@Component({
  selector: 'app-add-categories',
  templateUrl: './add-categories.component.html',
  styleUrls: ['./add-categories.component.scss'],
  animations: [routerTransition()]

})
export class AddCategoriesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
