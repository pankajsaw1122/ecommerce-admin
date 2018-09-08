import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
// import { Observable } from 'rxjs/Rx';
// import 'rxjs/Rx';

@Injectable()
export class ApiService {

  private apiUrl = 'http://localhost:5000/';

  constructor(private http: Http) { }

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
