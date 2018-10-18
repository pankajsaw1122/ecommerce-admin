import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { ApiService } from '../../../shared/services/api.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';

@Component({
    selector: 'app-add-categories',
    templateUrl: './add-categories.component.html',
    styleUrls: ['./add-categories.component.scss'],
    animations: [routerTransition()]

})
export class AddCategoriesComponent implements OnInit {
    categoriesForm: FormGroup;
    departmentsList = [];
    sliderImage: File;
    sliderImagePath: String;
    sliderImageUploadError: Boolean;
    wait: Boolean;
    formValid: Boolean;

    constructor(public dialog: MatDialog, private apiService: ApiService) { }

    ngOnInit() {
        this.departmentsList = [];
        this.sliderImagePath = '';
        this.sliderImage = null;
        this.sliderImagePath = '';
        this.sliderImageUploadError = false;
        this.wait = false;
        this.formValid = true;
        this.apiService.getDepartments().subscribe((response: any) => {
            console.log(response);
            if (response.status === 200) {
                this.departmentsList = response.data;
            }
        });
        this.categoriesForm = new FormGroup({
            'accessToken': new FormControl('dEStSa4Jd52b', Validators.required),
            'name': new FormControl('', Validators.required),
            'slug': new FormControl(''),
            'parentCategoryId': new FormControl('', Validators.required),
            'description': new FormControl(''),
            'offerLine1': new FormControl(''),
            'offerLine2': new FormControl('')
        });
    }

    sliderImageUpload(event) {
        this.wait = false;
        this.sliderImage = <File>event.target.files[0];
        console.log(this.sliderImage);
        const fd = new FormData;
        fd.append('image', this.sliderImage, this.sliderImage.name);
        console.log(fd);
        this.apiService.sliderImageUpload(fd).subscribe((response: any) => {
            console.log(response);
            if (response.status === 200 || response.status === '200') {
                console.log('upload Successful');
                this.sliderImagePath = response.data;
                this.wait = false;
                this.sliderImageUploadError = false;
            } else {
                this.sliderImageUploadError = true;
            }
        });
    }

    categoriesSubmit() {
        this.formValid = true;
        console.log('Tags Submit method');
        console.log(this.categoriesForm.valid);
        if (!this.categoriesForm.valid) {
            this.formValid = false;
            return false;
        }
        console.log(this.sliderImagePath);
        if (this.sliderImagePath === '' || this.sliderImagePath === undefined) {
            const dialogRef = this.dialog.open(ConfirmDialogComponent, {
                width: '40%',
                data: 'Please upload a image'
            });
            dialogRef.afterClosed().subscribe(result => {
                console.log('Dialog closed');
            });
            return false;
        }
        console.log(this.categoriesForm.value);
        this.apiService.saveCategories(this.categoriesForm.value).subscribe((response: any) => {
            console.log(response);
            if (response.status === 200) {
                this.formValid = true;
                const dialogRef = this.dialog.open(ConfirmDialogComponent, {
                    width: '40%',
                    data: 'Category saved successfully.'
                });
                dialogRef.afterClosed().subscribe(result => {
                    console.log('Dialog closed');
                });
                this.ngOnInit();
            } else {
                const dialogRef = this.dialog.open(ConfirmDialogComponent, {
                    width: '40%',
                    data: 'Error in saving category. Please try again...'
                });
                dialogRef.afterClosed().subscribe(result => {
                    console.log('Dialog closed');
                });
            }
        });
    }
}
