import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../shared/services/api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-coupans',
  templateUrl: './add-coupans.component.html',
  styleUrls: ['./add-coupans.component.scss'],
  animations: [routerTransition()]

})
export class AddCoupansComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
