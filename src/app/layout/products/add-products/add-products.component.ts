import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../shared/services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [routerTransition()]
})
export class AddProductsComponent implements OnInit {

  admissionForm: FormGroup;
  studentImage: File = null;
  imageId: String;
  upload = null;
  submitSuccess = null;
  selectedTab: Number = 0;
  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit() {
      this.admissionForm = new FormGroup({
          'admissionDate': new FormControl('', [Validators.required]),
          'studentName': new FormControl('', [Validators.required]),
          'boardName': new FormControl('', [Validators.required]),
          'schoolName': new FormControl(''),
          'className': new FormControl('', [Validators.required]),
          'sessionYear': new FormControl('', [Validators.required]),
          'mathematics': new FormControl(false),
          'physics': new FormControl(false),
          'lastExamPercentage': new FormControl(''),
          'studentEmail': new FormControl('', [Validators.required, Validators.email]),
          'studentConatctNumber': new FormControl(''),
          'gender': new FormControl(''),
          'parentsName': new FormControl(''),
          'parentsContact': new FormControl('', [Validators.required]),
          'parentsOccupation': new FormControl('')
      });
  }

  onFileSelect(event) {
      this.upload = 2;
      this.studentImage = <File>event.target.files[0];
      console.log(this.studentImage);
      const fd = new FormData;
      fd.append('image', this.studentImage, this.studentImage.name);
      console.log(fd);
      // this.apiService.studentImageUpload(fd).subscribe((data: any) => {
      //     console.log(data);
      //     if (data.status === 105 || data.status === '105') {
      //         console.log('upload Successful');
      //         this.imageId = data.imageId;
      //         this.upload = 1;
      //         // setTimeout(() => { this.uploadSuccess = false; }, 3000);
      //     } else {
      //         this.upload = 0;
      //         // setTimeout(() => { this.uploadFailed = false; }, 3000);
      //     }
      // });
  }
  onSubmit() {
      console.log(this.admissionForm.valid);
      let sub = '';
      if (this.admissionForm.get('mathematics').value === true) {
          sub = 'Mathematics';
      }
      if (this.admissionForm.get('physics').value === true) {
          sub = sub + ' ' + 'Physics';
      }
      let admissionData = {};
      admissionData = {
          'admission_date': this.admissionForm.get('admissionDate').value,
          'student_name': this.admissionForm.get('studentName').value,
          'board': this.admissionForm.get('boardName').value,
          'school_name': this.admissionForm.get('schoolName').value,
          'student_class': this.admissionForm.get('className').value,
          'student_session': this.admissionForm.get('sessionYear').value,
          'subjects': sub,
          'last_exam_percentage': this.admissionForm.get('lastExamPercentage').value,
          'email_id': this.admissionForm.get('studentEmail').value,
          'student_mobile_number': this.admissionForm.get('studentConatctNumber').value,
          'gender': this.admissionForm.get('gender').value,
          'parents_name': this.admissionForm.get('parentsName').value,
          'parents_contact_number': this.admissionForm.get('parentsContact').value,
          'parents_occupation': this.admissionForm.get('parentsOccupation').value,
          'student_image_id': this.imageId
      };

      // this.apiService.studentAdmission(admissionData).subscribe((data: any) => {
      //     console.log(data);
      //     if (data.status === 105 || data.status === '105') {
      //         console.log('admission Successful');
      //         setTimeout(() => {
      //             this.router.navigateByUrl('/apps/login', { skipLocationChange: true }).then(() =>
      //               this.router.navigate(['/admission']));
      //           }, 3000);
      //         this.submitSuccess = 1;
      //     } else {
      //         this.submitSuccess = 0;
      //         console.log('request failed');
      //     }
      // });
  }

}
