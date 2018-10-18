import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
    constructor(public router: Router) {}

    ngOnInit() {
        if (localStorage.getItem('isLoggedin') !== 'true') {
            this.router.navigate(['/login']);
        }
    }
}
