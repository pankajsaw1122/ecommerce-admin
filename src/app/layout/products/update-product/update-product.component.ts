import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../shared/services/api.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent implements OnInit {
  prductData = {};
  updateForm: FormGroup;
  departmentsList = [];
  subDepartmentsList = [];
  subCategoriesList: any = '';
  brandsList = [];
  unitList = [];
  taxStatusList = [];
  taxClassList = [];
  stockStatusList = [];
  tagsList = [];
  mainImage: File = null;
  auxillaryImage: File = null;
  imageUpdateData = {};
  showMessage = false;
  successMsg = '';
  errorMsg = '';
  constructor(public dialogRef: MatDialogRef<UpdateProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private apiService: ApiService) { }

  ngOnInit() {
    this.imageUpdateData = {
      departmentId: this.data.departmentId,
      subDepartmentId: this.data.subDepartmentId,
      productId: this.data.productId
    };
    console.log('print passed data');
    console.log(this.data);

    this.apiService.getDepartments().subscribe((response: any) => {
      // console.log(response);
      if (response.status === 200) {
        this.departmentsList = response.data;
      }
    });
    this.apiService.getSubDepartments(this.data.departmentId).subscribe((response: any) => {
      // console.log(response);
      this.subDepartmentsList = response.data;
    });
    this.apiService.getBrands().subscribe((response: any) => {
      // console.log(response);
      if (response.status === 200) {
        this.brandsList = response.data;
      }
    });
    this.apiService.getUnits().subscribe((response: any) => {
      console.log(response);
      if (response.status === 200) {
        this.unitList = response.data;
      }
    });
    this.apiService.getTaxStatus().subscribe((response: any) => {
      // console.log(response);
      if (response.status === 200) {
        this.taxStatusList = response.data;
      }
    });
    this.apiService.getTaxClass().subscribe((response: any) => {
      // console.log(response);
      if (response.status === 200) {
        this.taxClassList = response.data;
      }
    });
    this.apiService.getStockStatus().subscribe((response: any) => {
      // console.log(response);
      if (response.status === 200) {
        this.stockStatusList = response.data;
      }
    });
    this.apiService.getTags().subscribe((response: any) => {
      // console.log(response);
      if (response.status === 200) {
        this.tagsList = response.data;
      }
    });
    // console.log(this.data.departmentId);
    console.log('sold individual status');
    console.log(this.data.soldIndv);

    this.prductData = this.data;
    this.updateForm = new FormGroup({
      'accessToken': new FormControl('dEStSa4Jd52b'),
      'productId': new FormControl(this.data.productId),
      'departmentId': new FormControl(this.data.departmentId, Validators.required),
      'subDepartmentId': new FormControl(this.data.subDepartmentId, Validators.required),
      'subCategoryId': new FormControl(this.data.subCategoryId),
      'productName': new FormControl(this.data.productName, Validators.required),
      'brandId': new FormControl(this.data.brandId),
      'unitId': new FormControl(this.data.unitId),
      'unit': new FormControl(this.data.unit),
      'description': new FormControl(this.data.description),
      'regularPrice': new FormControl(this.data.regularPrice, Validators.required),
      'salePrice': new FormControl(this.data.salePrice, Validators.required),
      'taxStatusId': new FormControl(this.data.taxStatusId),
      'taxClassId': new FormControl(this.data.taxClassId),
      'sku': new FormControl(this.data.sku),
      'manageStock': new FormControl(this.data.manageStock),
      'stockStatusId': new FormControl(this.data.stockStatusId, Validators.required),
      'soldIndv': new FormControl(this.data.soldIndv),
      'weight': new FormControl(this.data.weight, Validators.required),
      'dimensionLength': new FormControl(this.data.dimensionLength),
      'dimensionWidth': new FormControl(this.data.dimensionWidth),
      'dimensionHeight': new FormControl(this.data.dimensionHeight),
      'shippingClassId': new FormControl(this.data.shippingClassId),
      'upsells': new FormControl(this.data.upsells),
      'crossSells': new FormControl(this.data.crossSells),
      'longDescription': new FormControl(this.data.longDescription),
      'additionalInfo': new FormControl(this.data.additionalInfo),
      'help': new FormControl(this.data.help),
      'tagId': new FormControl(this.data.tagId)
    });
  }

  mainImageUpload(event) {
    this.mainImage = <File>event.target.files[0];
    console.log(this.mainImage);
    const fd = new FormData;
    fd.append('image', this.mainImage, this.mainImage.name);
    fd.append('data', JSON.stringify(this.imageUpdateData));
    // fd.append('categoryId', categoryId)
    console.log(fd);
    this.apiService.mainImageUpload(fd).subscribe((data: any) => {
      console.log(data);
      if (data.status === 200 || data.status === '200') {
        console.log('upload Successful');
        // this.mainImageUploaded = true;
      } else {
      }
    });
  }

  auxillaryImageUpload(event) {
    this.auxillaryImage = <File>event.target.files[0];
    console.log(this.auxillaryImage);
    const fd = new FormData;
    fd.append('image', this.auxillaryImage, this.auxillaryImage.name);
    fd.append('data', JSON.stringify(this.imageUpdateData));
    // fd.append('categoryId', categoryId)
    console.log(fd);
    this.apiService.auxillaryImageUpload(fd).subscribe((data: any) => {
      console.log(data);
      if (data.status === 200 || data.status === '200') {
        console.log('upload Successful');
        // this.auxillaryImageUploaded = true;
      } else {
      }
    });
  }

  updateProduct() {
    console.log(this.updateForm.value);
    if (this.updateForm.value.departmentId === '') {
      this.updateForm.value.departmentId = 0;
    }
    if (this.updateForm.value.subDepartmentId === '') {
      this.updateForm.value.subDepartmentId = 0;
    }
    if (this.updateForm.value.subCategoryId === '') {
      this.updateForm.value.subCategoryId = 0;
    }
    if (this.updateForm.value.brandId === '') {
      this.updateForm.value.brandId = 0;
    }
    if (this.updateForm.value.unitId === '') {
      this.updateForm.value.unitId = 0;
    }
    if (this.updateForm.value.taxStatusId === '') {
      this.updateForm.value.taxStatusId = 0;
    }
    if (this.updateForm.value.taxClassId === '') {
      this.updateForm.value.taxClassId = 0;
    }
    if (this.updateForm.value.manageStock === true) {
      this.updateForm.value.manageStock = 1;
    } else {
      this.updateForm.value.manageStock = 0;
    }
    if (this.updateForm.value.stockStatusId === '') {
      this.updateForm.value.stockStatusId = 0;
    }
    if (this.updateForm.value.soldIndv === true) {
      this.updateForm.value.soldIndv = 1;
    } else {
      this.updateForm.value.soldIndv = 0;
    }
    if (this.updateForm.value.shippingClassId === '') {
      this.updateForm.value.shippingClassId = 0;
    }
    if (this.updateForm.value.tagId === '') {
      this.updateForm.value.tagId = 0;
    }
    this.apiService.updateProduct(this.updateForm.value).subscribe((response: any) => {
      console.log(response);
      if (response.status === 200) {
        console.log('Product updated successfully');
        this.successMessage('Product updated successfully');
      } else {
        this.errorMessage('error in updating data, Please try again');
      }
    });

  }
  successMessage(msg) {
    setTimeout(() => {
      this.successMsg = '';
    }, 3000);
    this.successMsg = msg;
  }
  errorMessage(msg) {
    setTimeout(() => {
      this.errorMsg = '';
    }, 3000);
    this.errorMsg = msg;
  }
}
