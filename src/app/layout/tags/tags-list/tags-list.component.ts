import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../shared/services/api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tags-list',
  templateUrl: './tags-list.component.html',
  styleUrls: ['./tags-list.component.scss'],
  animations: [routerTransition()]
})
export class TagsListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
