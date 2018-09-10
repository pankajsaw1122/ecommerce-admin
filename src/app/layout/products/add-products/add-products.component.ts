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
    // Tab managing variable
    priceTab = true;
    inventoryTab = true;
    shippingTab = true;
    linkedProductsTab = true;
    attributesTab = true;
    tagsTab = true;
    selectedTab: Number = 3;

    // Form Groups
    formValid = true;
    generalForm: FormGroup;
    priceForm: FormGroup;
    inventoryForm: FormGroup;

    // studentImage: File = null;
    // imageId: String;
    // upload = null;
    // submitSuccess = null;
    // General Form varibales
    departmentsList = [];
    subDepartmentsList = [];
    subCategoriesList: any = '';
    brandsList = [];

    productData = {
        departmentId: 0,
        subDepartmentId: 0,
        subCategoryId: 0,
        productName: '',
        brandId: 0,
        description: '',
        regularPrice: 0,
        salePrice: 0,
        taxStatusId: 0,
        taxClassId: 0,
        sku: '',
        manageStock: 0,
        stockStatusId: 0,
        soldIndv: 0
    };

    taxStatusList = [];
    taxClassList = [];
    stockStatusList = [];
    constructor(private apiService: ApiService, private router: Router) { }

    ngOnInit() {
        // General Tab data
        this.apiService.getDepartments().subscribe((response: any) => {
            console.log(response);
            this.departmentsList = response.data;
        });
        this.apiService.getBrands().subscribe((response: any) => {
            console.log(response);
            this.brandsList = response.data;
        });

        this.generalForm = new FormGroup({
            'departmentId': new FormControl(0, Validators.required),
            'subDepartmentId': new FormControl(0, Validators.required),
            'subCategoryId': new FormControl(0),
            'productName': new FormControl('', Validators.required),
            'brandId': new FormControl(0),
            'description': new FormControl(''),
        });

        // price tab data

        this.apiService.getTaxStatus().subscribe((response: any) => {
            console.log(response);
            this.taxStatusList = response.data;
        });
        this.apiService.getTaxClass().subscribe((response: any) => {
            console.log(response);
            this.taxClassList = response.data;
        });
        this.priceForm = new FormGroup({
            'regularPrice': new FormControl(0, Validators.required),
            'salePrice': new FormControl(0, Validators.required),
            'taxStatusId': new FormControl(0),
            'taxClassId': new FormControl(0)
        });

        this.apiService.getStockStatus().subscribe((response: any) => {
            console.log(response);
            this.stockStatusList = response.data;
        });
        // inventoryForm
        this.inventoryForm = new FormGroup({
            'sku': new FormControl(''),
            'manageStock': new FormControl(false),
            'stockStatusId': new FormControl(0, Validators.required),
            'soldIndv': new FormControl(false)
        });

    }

    // General Form Data
    onDepartemntChange(id) {
        console.log('onDepartemntChange called' + id);
        this.apiService.getSubDepartemnts(id).subscribe((response: any) => {
            console.log(response);
            this.subDepartmentsList = response.data;
        });
    }
    onSubDepartemntChange(id) {
        console.log('getSubCategories called == ' + id);
        this.apiService.getSubCategories(id).subscribe((response: any) => {
            console.log(response);
            this.subCategoriesList = response.data;
        });
    }
    generalSubmit() {
        this.formValid = true;
        console.log('Api called from component');
        console.log(this.generalForm.valid);
        if (!this.generalForm.valid) {
            this.formValid = false;
            return false;
        }
        // Change tab
        this.priceTab = false;
        this.selectedTab = 1;
        // Create Product data
        this.productData.departmentId = this.generalForm.get('departmentId').value;
        this.productData.subDepartmentId = this.generalForm.get('subDepartmentId').value;
        this.productData.subCategoryId = this.generalForm.get('subCategoryId').value;
        this.productData.productName = this.generalForm.get('subCategoryId').value;
        this.productData.brandId = this.generalForm.get('brandId').value;
        this.productData.description = this.generalForm.get('description').value;
    }

    priceSubmit() {
        this.formValid = true;
        console.log('Price Submit method');
        console.log(this.priceForm.valid);
        if (!this.priceForm.valid) {
            this.formValid = false;
            return false;
        }
        // Change tab
        this.inventoryTab = false;
        this.selectedTab = 2;
        // Create Product data
        this.productData.regularPrice = this.priceForm.get('regularPrice').value;
        this.productData.salePrice = this.priceForm.get('salePrice').value;
        this.productData.taxStatusId = this.priceForm.get('taxStatusId').value;
        this.productData.taxClassId = this.priceForm.get('taxClassId').value;

        console.log(this.productData);
    }

    inventorySubmit() {
        this.formValid = true;
        console.log('inventoryForm Submit method');
        console.log(this.inventoryForm.valid);
        if (!this.inventoryForm.valid) {
            this.formValid = false;
            return false;
        }
        // Change tab
        this.shippingTab = false;
        this.selectedTab = 3;
        // Create Product data
        this.productData.sku = this.inventoryForm.get('sku').value;
        if (this.inventoryForm.get('manageStock').value) {
            this.productData.manageStock = 1;
        }
        this.productData.stockStatusId = this.inventoryForm.get('stockStatusId').value;
        if (this.inventoryForm.get('soldIndv').value) {
            this.productData.soldIndv = 1;
        }
        console.log(this.productData);
    }

    onFileSelect(event) {
        // this.upload = 2;
        // this.studentImage = <File>event.target.files[0];
        // console.log(this.studentImage);
        // const fd = new FormData;
        // fd.append('image', this.studentImage, this.studentImage.name);
        // console.log(fd);
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

}
