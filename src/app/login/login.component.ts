import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../shared/services/api.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    successMsg: Boolean = false;
    successMsgDisplay: String = '';
    errorMsg: Boolean = false;
    errorMsgDisplay: String = '';
    constructor(public router: Router, private apiService: ApiService) { }

    ngOnInit() {
        this.loginForm = new FormGroup({
            'loginEmail': new FormControl('', [Validators.required, Validators.email]),
            'loginPassword': new FormControl('', [Validators.required]),
        });
    }

    onLoggedin() {
        console.log('logged in worked');
        localStorage.setItem('isLoggedin', 'true');
        this.router.navigate(['/dashboard']);
        // console.log(this.loginForm.get('loginEmail').value);
        // let loginData = {};
        // loginData = { 'email_id': this.loginForm.get('loginEmail').value, 'password': this.loginForm.get('loginPassword').value };
        // this.apiService.loginAdmin(loginData).subscribe((data: any) => {
        //     console.log(data);
        //     if (data.status === 105 || data.status === '105') {
        //         this.successMessage('logging in please wait');
        //         localStorage.setItem('isLoggedin', 'true');
        //         localStorage.setItem('adminName', data.adminName);
        //         localStorage.setItem('accessToken', data.accessToken);
        //         localStorage.setItem('adminEmail', data.adminEmail);
        //         this.router.navigate(['/dashboard']);
        //     } else {
        //         this.errorMessage('login failed please try again');
        //     }
        // });
    }
        successMessage(message) {
            this.successMsg = true;
            this.successMsgDisplay = message;

            setTimeout(() => {
                this.successMsg = false;
                this.successMsgDisplay = '';
            }, 3000);
        }

        errorMessage(message) {
            this.errorMsg = true;
            this.errorMsgDisplay = message;

            setTimeout(() => {
                this.errorMsg = false;
                this.errorMsgDisplay = '';
            }, 3000);
        }
}
