import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { ApiService } from '../../../shared/services/api.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
  animations: [routerTransition()]

})
export class ProductsListComponent implements OnInit {

  board = '';
  student_class = '';
  student_session = '';
  constructor(private apiService: ApiService) {}

  ngOnInit() {}
  getListOfStudent(event: Event) {
      console.log('cahnge worked');
      console.log(this.board);
       console.log(this.student_class);
       console.log(this.student_session);

       let listParameter = {};
       listParameter = {
          board: this.board,
          student_class: this.student_class,
          student_session: this.student_session
       };

      //  this.apiService.getStudentList(listParameter).subscribe((data: any) => {
      //     console.log(data);
      //     if (data.status === 105 || data.status === '105') {
      //         console.log('admission Successful');
      //     } else {

      //         console.log('request failed');
      //     }
      // });
  }

}
