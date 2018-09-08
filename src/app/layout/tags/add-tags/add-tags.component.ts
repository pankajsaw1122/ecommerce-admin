import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../shared/services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-add-tags',
  templateUrl: './add-tags.component.html',
  styleUrls: ['./add-tags.component.scss'],
  animations: [routerTransition()]

})
export class AddTagsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
