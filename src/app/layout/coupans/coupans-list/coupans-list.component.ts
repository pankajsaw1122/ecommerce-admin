import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../shared/services/api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-coupans-list',
  templateUrl: './coupans-list.component.html',
  styleUrls: ['./coupans-list.component.scss'],
  animations: [routerTransition()]

})
export class CoupansListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
