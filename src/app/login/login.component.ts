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
            'emailOrMobile': new FormControl('', [Validators.required, Validators.email]),
            'password': new FormControl('', [Validators.required]),
        });
    }

    onLoggedin() {
        console.log('logged in worked');
        if (this.loginForm.valid) {
            this.apiService.loginAdmin(this.loginForm.value).subscribe((response: any) => {
                console.log(response);
                if (response.status === 200 || response.status === '200') {
                    this.successMessage('logging in please wait');
                    localStorage.setItem('isLoggedin', 'true');
                    localStorage.setItem('adminName', response.data.adminName);
                    localStorage.setItem('accessToken', response.data.accessToken);
                    localStorage.setItem('adminEmail', response.data.adminEmail);
                    this.router.navigate(['/dashboard']);
                } else {
                    this.errorMessage('login failed please try again');
                }
            });
        } else {
            this.errorMessage('Please enter your user id and password');

        }
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
