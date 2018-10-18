import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../shared/services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';

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
    selectedTab: Number = 0;
    productSaved = false;

    // Form Groups
    formValid = true;
    generalForm: FormGroup;
    priceForm: FormGroup;
    inventoryForm: FormGroup;
    shippingForm: FormGroup;
    linkedProductForm: FormGroup;
    attributesForm: FormGroup;
    tagsForm: FormGroup;

    departmentsList = [];
    subDepartmentsList = [];
    subCategoriesList: any = '';
    brandsList = [];
    unitList = [];
    taxStatusList = [];
    taxClassList = [];
    stockStatusList = [];
    tagsList = [];

    productData = {
        accessToken: 'dEStSa4Jd52b',
        departmentId: 0,
        subDepartmentId: 0,
        subCategoryId: 0,
        productName: '',
        brandId: 0,
        unitId: 0,
        unit: 0,
        description: '',
        regularPrice: 0,
        salePrice: 0,
        taxStatusId: 0,
        taxClassId: 0,
        sku: '',
        manageStock: 0,
        stockStatusId: 0,
        soldIndv: 0,
        weight: 0,
        dimensionLength: 0,
        dimensionWidth: 0,
        dimensionHeight: 0,
        shippingClassId: 0,
        upsells: '',
        crossSells: '',
        longDescription: '',
        additionalInfo: '',
        help: '',
        tagId: 0
    };
    productResult = {
        departmentId: '',
        subDepartmentId: '',
        productId: ''
    };
    mainImage: File = null;
    auxillaryImage: File = null;
    mainImageUploaded = false;
    auxillaryImageUploaded = false;
    constructor(public dialog: MatDialog, private apiService: ApiService, private router: Router) { }

    ngOnInit() {
        // General Tab data
        this.apiService.getDepartments().subscribe((response: any) => {
            console.log(response);
            if (response.status === 200) {
                this.departmentsList = response.data;
            }
        });
        this.apiService.getBrands().subscribe((response: any) => {
            console.log(response);
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


        this.generalForm = new FormGroup({
            'departmentId': new FormControl('', Validators.required),
            'subDepartmentId': new FormControl('', Validators.required),
            'subCategoryId': new FormControl(''),
            'productName': new FormControl('', Validators.required),
            'brandId': new FormControl(''),
            'unitId': new FormControl(''),
            'unit': new FormControl(''),
            'description': new FormControl(''),
        });

        // price tab data

        this.apiService.getTaxStatus().subscribe((response: any) => {
            console.log(response);
            if (response.status === 200) {
                this.taxStatusList = response.data;
            }
        });
        this.apiService.getTaxClass().subscribe((response: any) => {
            console.log(response);
            if (response.status === 200) {
                this.taxClassList = response.data;
            }
        });
        this.priceForm = new FormGroup({
            'regularPrice': new FormControl('', Validators.required),
            'salePrice': new FormControl('', Validators.required),
            'taxStatusId': new FormControl(''),
            'taxClassId': new FormControl('')
        });
        // Inventory Data
        this.apiService.getStockStatus().subscribe((response: any) => {
            console.log(response);
            if (response.status === 200) {
                this.stockStatusList = response.data;
            }
        });
        // inventoryForm
        this.inventoryForm = new FormGroup({
            'sku': new FormControl(''),
            'manageStock': new FormControl(false),
            'stockStatusId': new FormControl('', Validators.required),
            'soldIndv': new FormControl(false)
        });

        // Shipping tab data

        // Shipping Tab
        this.shippingForm = new FormGroup({
            'weight': new FormControl('', Validators.required),
            'dimensionLength': new FormControl(0),
            'dimensionWidth': new FormControl(0),
            'dimensionHeight': new FormControl(0),
            'shippingClassId': new FormControl(''),
        });

        this.linkedProductForm = new FormGroup({
            'upsells': new FormControl(''),
            'crossSells': new FormControl('')
        });
        this.attributesForm = new FormGroup({
            'longDescription': new FormControl(''),
            'additionalInfo': new FormControl(''),
            'help': new FormControl('')
        });

        this.apiService.getTags().subscribe((response: any) => {
            console.log(response);
            if (response.status === 200) {
                this.tagsList = response.data;
            }
        });
        this.tagsForm = new FormGroup({
            'tagId': new FormControl('')
        });
    }

    // General Form Data
    onDepartmentChange(id) {
        console.log('onDepartemntChange called' + id);
        this.apiService.getSubDepartments(id).subscribe((response: any) => {
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
        if (this.generalForm.get('departmentId').value !== '') {
            this.productData.departmentId = this.generalForm.get('departmentId').value;
        }
        if (this.generalForm.get('subDepartmentId').value !== '') {
            this.productData.subDepartmentId = this.generalForm.get('subDepartmentId').value;
        }
        if (this.generalForm.get('subCategoryId').value !== '') {
            this.productData.subCategoryId = this.generalForm.get('subCategoryId').value;
        }
        this.productData.productName = this.generalForm.get('productName').value;
        if (this.generalForm.get('brandId').value !== '') {
            this.productData.brandId = this.generalForm.get('brandId').value;
        }
        if (this.generalForm.get('unitId').value !== '') {
            this.productData.unitId = this.generalForm.get('unitId').value;
        }
        this.productData.unit = this.generalForm.get('unit').value;
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
        if (this.priceForm.get('taxStatusId').value !== '') {
            this.productData.taxStatusId = this.priceForm.get('taxStatusId').value;
        }
        if (this.priceForm.get('taxClassId').value !== '') {
            this.productData.taxClassId = this.priceForm.get('taxClassId').value;
        }
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
        if (this.inventoryForm.get('stockStatusId').value !== '') {
            this.productData.stockStatusId = this.inventoryForm.get('stockStatusId').value;
        }
        if (this.inventoryForm.get('soldIndv').value) {
            this.productData.soldIndv = 1;
        }
        console.log(this.productData);
    }
    shippingSubmit() {
        this.formValid = true;
        console.log('inventoryForm Submit method');
        console.log(this.shippingForm.valid);
        if (!this.shippingForm.valid) {
            this.formValid = false;
            return false;
        }
        // Change tab
        this.linkedProductsTab = false;
        this.selectedTab = 4;
        // Create Product data
        this.productData.weight = this.shippingForm.get('weight').value;
        this.productData.dimensionLength = this.shippingForm.get('dimensionLength').value;
        this.productData.dimensionWidth = this.shippingForm.get('dimensionWidth').value;
        this.productData.dimensionHeight = this.shippingForm.get('dimensionHeight').value;
        if (this.shippingForm.get('shippingClassId').value !== '') {
            this.productData.shippingClassId = this.shippingForm.get('shippingClassId').value;
        }

        console.log(this.productData);
    }
    linkedProduct() {
        this.formValid = true;
        console.log('inventoryForm Submit method');
        console.log(this.linkedProductForm.valid);
        if (!this.linkedProductForm.valid) {
            this.formValid = false;
            return false;
        }
        // Change tab
        this.attributesTab = false;
        this.selectedTab = 5;
        // Create Product data
        this.productData.upsells = this.linkedProductForm.get('upsells').value;
        this.productData.crossSells = this.linkedProductForm.get('crossSells').value;

        console.log(this.productData);
    }
    attributesSubmit() {
        this.formValid = true;
        console.log('inventoryForm Submit method');
        console.log(this.attributesForm.valid);
        if (!this.attributesForm.valid) {
            this.formValid = false;
            return false;
        }
        // Change tab
        this.tagsTab = false;
        this.selectedTab = 6;
        // Create Product data
        this.productData.longDescription = this.attributesForm.get('longDescription').value;
        this.productData.additionalInfo = this.attributesForm.get('additionalInfo').value;
        this.productData.help = this.attributesForm.get('help').value;

        console.log(this.productData);
    }

    saveProduct() {
        this.formValid = true;
        console.log('Tags Submit method');
        console.log(this.tagsForm.valid);
        if (!this.tagsForm.valid) {
            this.formValid = false;
            return false;
        }
        if (this.tagsForm.get('tagId').value !== '') {
            this.productData.tagId = this.tagsForm.get('tagId').value;
        }
        this.apiService.saveProduct(this.productData).subscribe((response: any) => {
            console.log(response);
            if (response.status === 200) {
                this.productResult.departmentId = response.data.departmentId;
                this.productResult.subDepartmentId = response.data.subDepartmentId;
                this.productResult.productId = response.data.insertId;
                const dialogRef = this.dialog.open(ConfirmDialogComponent, {
                    width: '40%',
                    data: 'Product details saved successfully. Please upload product images now'
                });
                dialogRef.afterClosed().subscribe(result => {
                    console.log('Dialog closed');
                });
                this.productSaved = true;
            }
        });
        // this.generalForm.reset();
    }

    mainImageUpload(event) {
        this.mainImage = <File>event.target.files[0];
        console.log(this.mainImage);
        const fd = new FormData;
        fd.append('image', this.mainImage, this.mainImage.name);
        fd.append('data', JSON.stringify(this.productResult));
        // fd.append('categoryId', categoryId)
        console.log(fd);
        this.apiService.mainImageUpload(fd).subscribe((data: any) => {
            console.log(data);
            if (data.status === 200 || data.status === '200') {
                console.log('upload Successful');
                this.mainImageUploaded = true;
            } else {
            }
        });
    }

    auxillaryImageUpload(event) {
        this.auxillaryImage = <File>event.target.files[0];
        console.log(this.auxillaryImage);
        const fd = new FormData;
        fd.append('image', this.auxillaryImage, this.auxillaryImage.name);
        fd.append('data', JSON.stringify(this.productResult));
        // fd.append('categoryId', categoryId)
        console.log(fd);
        this.apiService.auxillaryImageUpload(fd).subscribe((data: any) => {
            console.log(data);
            if (data.status === 200 || data.status === '200') {
                console.log('upload Successful');
                this.auxillaryImageUploaded = true;
            } else {
            }
        });
    }
    submitProduct() {
        if (this.mainImageUploaded === true && this.auxillaryImageUploaded === true) {
            const dialogRef = this.dialog.open(ConfirmDialogComponent, {
                width: '40%',
                data: 'Product saved successfully.'
            });
            dialogRef.afterClosed().subscribe(result => {
                console.log('Dialog closed');
            });
            this.priceTab = true;
            this.inventoryTab = true;
            this.shippingTab = true;
            this.linkedProductsTab = true;
            this.attributesTab = true;
            this.tagsTab = true;
            this.selectedTab = 0;
            this.productSaved = false;
            this.productData = {
                accessToken: 'dEStSa4Jd52b',
                departmentId: 0,
                subDepartmentId: 0,
                subCategoryId: 0,
                productName: '',
                brandId: 0,
                unitId: 0,
                unit: 0,
                description: '',
                regularPrice: 0,
                salePrice: 0,
                taxStatusId: 0,
                taxClassId: 0,
                sku: '',
                manageStock: 0,
                stockStatusId: 0,
                soldIndv: 0,
                weight: 0,
                dimensionLength: 0,
                dimensionWidth: 0,
                dimensionHeight: 0,
                shippingClassId: 0,
                upsells: '',
                crossSells: '',
                longDescription: '',
                additionalInfo: '',
                help: '',
                tagId: 0
            };
            this.productResult = {
                departmentId: '',
                subDepartmentId: '',
                productId: ''
            };
            this.mainImage = null;
            this.auxillaryImage = null;
            this.mainImageUploaded = false;
            this.auxillaryImageUploaded = false;
            this.ngOnInit();
        } else {
            const dialogRef = this.dialog.open(ConfirmDialogComponent, {
                width: '40%',
                data: 'Please upload images of product.'
            });
            dialogRef.afterClosed().subscribe(result => {
                console.log('Dialog closed');
            });
        }
    }
}
