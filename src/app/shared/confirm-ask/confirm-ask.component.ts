import { NgModule, Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-ask-dialog',
    templateUrl: './confirm-ask.component.html',
    styleUrls: ['./confirm-ask.component.scss']
})
export class ConfirmAskComponent implements OnInit {
    public confirmMessage: string;

    constructor(public dialogRef: MatDialogRef<ConfirmAskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
    ngOnInit() {
        this.confirmMessage = this.data;
    }
}
