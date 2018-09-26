import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { ApiService } from '../../../shared/services/api.service';
import { MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UpdateProductComponent } from '../update-product/update-product.component';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
  animations: [routerTransition()]

})
export class ProductsListComponent implements OnInit {

  departmentsList = [];
  subDepartmentsList = [];
  productList = [];
  departmentId = 0;
  subDepartmentId = 0;
  displayedColumns: string[] = [
    'productId',
    'productName',
    'departmentName',
    'subDepartmentName',
    'brand',
    'regularPrice',
    'salePrice',
    'stockStatus',
    'tag',
    'mainImage',
    'action'
  ];
  data: any;
  resultsLength = 0;
  isLoadingResults = false;
  constructor(public dialog: MatDialog, private apiService: ApiService) { }

  ngOnInit() {
    // console.log(this.data);
    this.apiService.getDepartments().subscribe((response: any) => {
      console.log(response);
      if (response.status === 200) {
        this.departmentsList = response.data;
      }
    });
  }

  onDepartmentChange() {
    this.apiService.getSubDepartments(this.departmentId).subscribe((response: any) => {
      this.subDepartmentsList = response.data;
    });
  }

  applyFilter(filterValue: string) {
    this.data.filter = filterValue.trim().toLowerCase();
  }

  getProductList() {
    const data = {
      departmentId: this.departmentId,
      subDepartmentId: this.subDepartmentId
    };
    this.isLoadingResults = true;
    this.apiService.getProducts(data).subscribe((response: any) => {
      this.productList = response.data;
      this.data = new MatTableDataSource(response.data);
      this.isLoadingResults = false;
      this.resultsLength = response.data.length;
    });
  }

  editProduct(prodData) {
    console.log('print product data');
    console.log(prodData);

   let setData = {
      accessToken: 'dEStSa4Jd52b',
      productId: prodData.productId,
      departmentId: 0,
      subDepartmentId: 0,
      subCategoryId: 0,
      productName: prodData.productName,
      brandId: 0,
      description: prodData.description,
      regularPrice: prodData.regularPrice,
      salePrice: prodData.salePrice,
      taxStatusId: 0,
      taxClassId: 0,
      sku: prodData.sku,
      manageStock: prodData.manageStock === 'yes' ? true : false,
      stockStatusId: 0,
      soldIndv: prodData.soldIndividually === 'yes' ? true : false,
      weight: prodData.weight,
      dimensionLength: prodData.dimensionLength,
      dimensionWidth: prodData.dimensionWidth,
      dimensionHeight: prodData.dimensionHeight,
      shippingClassId: 0,
      upsells: prodData.upsells,
      crossSells: prodData.crossSells,
      longDescription: prodData.longDescription,
      additionalInfo: prodData.additionalInfo,
      help: prodData.help,
      tagId: prodData.tag,
      mainImage: prodData.mainImage,
      auxillaryImage: prodData.auxillaryImage
    };
    this.apiService.getUpdateRequiers(prodData.productId).subscribe((response: any) => {
      if (response.status === 200) {
        // this.departmentsList = response.data;
        setData.departmentId = response.data[0].department_id !== 0 ? response.data[0].department_id : '';
        setData.subDepartmentId = response.data[0].sub_department_id !== 0 ? response.data[0].sub_department_id : '';
        setData.subCategoryId = response.data[0].sub_category_id !== 0 ? response.data[0].sub_category_id : '';
        setData.brandId = response.data[0].brand_id !== 0 ? response.data[0].brand_id : '';
        setData.taxStatusId = response.data[0].tax_status_id !== 0 ? response.data[0].tax_status_id : '';
        setData.taxClassId = response.data[0].tax_class_id !== 0 ? response.data[0].tax_class_id : '';
        setData.stockStatusId = response.data[0].stock_status_id !== 0 ? response.data[0].stock_status_id : '';
        setData.shippingClassId = response.data[0].shipping_class_id !== 0 ? response.data[0].shipping_class_id : '';
        setData.tagId = response.data[0].tag_id !== 0 ? response.data[0].tag_id : '';

        this.apiService.getSubDepartments(response.data[0].department_id).subscribe((responseData: any) => {
          this.subDepartmentsList = responseData.data;
          const dialogRef = this.dialog.open(UpdateProductComponent, {
            width: '80%',
            data: setData,
          });
          dialogRef.afterClosed().subscribe(result => {
            console.log('Dialog closed');
          });
        });
      }
    });
  }
  deleteProduct(id) {
    let deleteData = {
      productId: id,
      accessToken: 'dEStSa4Jd52b'
    };
    this.apiService.deleteProduct(deleteData).subscribe((response: any) => {
      console.log(response);
    });

  }
}
