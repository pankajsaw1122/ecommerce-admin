import { Injectable } from '@angular/core';
// import { Http, Response } from '@angular/http';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
@Injectable()
export class ApiService {

  private apiUrl = 'http://localhost:5000/';

  constructor(private http: HttpClient) { }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }

  // Add products General Tab Data
  getDepartments():  Observable<any> {
    console.log('test Api called');
    return this.http.get(this.apiUrl + 'categories/getDepartment').pipe(map((response: Response) => {
      return response;
    })).pipe(catchError(this.handleError));
  }

  getSubDepartemnts(id):  Observable<any> {
    console.log('test Api called');
    return this.http.get(this.apiUrl + 'categories/getSubDepartment', {
      params: {
        departmentId: id
      }
    }).pipe(map((response: Response) => {
      return response;
    })).pipe(catchError(this.handleError));
  }

  getSubCategories(id):  Observable<any> {
    console.log('test Api called');
    return this.http.get(this.apiUrl + 'categories/getSubCategory', {
      params: {
        subDepartmentId: id
      }
    }).pipe(map((response: Response) => {
      return response;
    })).pipe(catchError(this.handleError));
  }

  getBrands():  Observable<any> {
    console.log('test Api called');
    return this.http.get(this.apiUrl + 'categories/getBrands').pipe(map((response: Response) => {
      return response;
    })).pipe(catchError(this.handleError));
  }

  // Add products Price tab data

  getTaxStatus(): Observable<any> {
    return this.http.get(this.apiUrl + 'products/getTaxStatus').pipe(map((response: Response) => {
      return response;
    })).pipe(catchError(this.handleError));
  }

  getTaxClass(): Observable<any> {
    return this.http.get(this.apiUrl + 'products/getTaxClass').pipe(map((response: Response) => {
      return response;
    })).pipe(catchError(this.handleError));
  }

  getStockStatus(): Observable<any> {
    return this.http.get(this.apiUrl + 'products/getStockStatus').pipe(map((response: Response) => {
      return response;
    })).pipe(catchError(this.handleError));
  }

  getTags(): Observable<any> {
    return this.http.get(this.apiUrl + 'products/getTags').pipe(map((response: Response) => {
      return response;
    })).pipe(catchError(this.handleError));
  }

  saveProduct(data): Observable<any> {
    return this.http.post(this.apiUrl + 'products/addProduct', data).pipe(map((response: Response) => {
      return response;
    })).pipe(catchError(this.handleError));
  }


  testApi(): Observable<any> {
    console.log('test Api called');
    return this.http.get(this.apiUrl + 'products/getProducts').pipe(map((response: Response) => {
      return response;
    })).pipe(catchError(this.handleError));
  }

  // // error handling
  // private handleError(error: Response) {
  //   return Observable.throw(error.statusText);
  // }
  // // -------------- pages auth start ----------------//
  // // login api
  // loginAdmin(data): Observable<any> {
  //   return this.http.post(this.apiUrl + 'adminLogin', data)
  //     .map((response: Response) => {
  //       return response.json();
  //     })
  //     .catch(this.handleError);
  // }
  // studentAdmission(data): Observable<any> {
  //   return this.http.post(this.apiUrl + 'studentAdmission', data)
  //     .map((response: Response) => {
  //       return response.json();
  //     })
  //     .catch(this.handleError);
  // }
  // studentImageUpload(data): Observable<any> {
  //   return this.http.post(this.apiUrl + 'imageUpload', data)
  //     .map((response: Response) => {
  //       return response.json();
  //     })
  //     .catch(this.handleError);
  // }

  // searchStudent(data): Observable<any> {
  //   return this.http.post(this.apiUrl + 'searchStudent', data)
  //     .map((response: Response) => {
  //       return response.json();
  //     })
  //     .catch(this.handleError);
  // }
  // feesSubmit(data): Observable<any> {
  //   return this.http.post(this.apiUrl + 'insertFees', data)
  //     .map((response: Response) => {
  //       return response.json();
  //     })
  //     .catch(this.handleError);
  // }
  // getStudentList(data): Observable<any> {
  //       return this.http.get(this.apiUrl + 'studentList/?' + 'type=' + data).map((response: Response) => {
  //         return response.json();
  //       }).catch(this.handleError);
  //     }
  // forgotPassword api
  //   forgotPassword(email: String): Observable<any> {
  //     return this.http.post(this.apiUrl + 'forgotPassword',
  //       {
  //         email: email
  //       }).map((response: Response) => {
  //         return response.json();
  //       })
  //       .catch(this.handleError);
  //   }

  // change password api
  //   changePassword(changePasswordData): Observable<any> {
  //     return this.http.post(this.apiUrl + 'changePassword', changePasswordData)
  //       .map((response: Response) => {
  //         return response.json();
  //       })
  //       .catch(this.handleError);
  //   }
  // -------------- pages auth end ----------------//

  // -------------- User module start ----------------//
  // add new User api
  //   addNewUser(addUserData): Observable<any> {
  //     return this.http.post(this.apiUrl + 'addUser', addUserData)
  //       .map((response: Response) => {
  //         return response.json();
  //       })
  //       .catch(this.handleError);
  //   }

  // View admin/user api
  //   viewUsers(data): Observable<any> {
  //     return this.http.get(this.apiUrl + 'viewUser/?' + 'type=' + data).map((response: Response) => {
  //       return response.json();
  //     }).catch(this.handleError);
  //   }

  // delete User api
  //   deleteUser(data): Observable<any> {
  //     return this.http.post(this.apiUrl + 'user/delete', data)
  //       .map((response: Response) => {
  //         return response.json();
  //       })
  //       .catch(this.handleError);
  //   }

  // Edit user data api
  //   editUser(data): Observable<any> {
  //     return this.http.post(this.apiUrl + 'user/update', data)
  //       .map((response: Response) => {
  //         return response.json();
  //       })
  //       .catch(this.handleError);
  //   }
  // -------------- User module end ----------------//
}
