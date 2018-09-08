import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
    selector   : 'fuse-confirm-dialog',
    templateUrl: './confirm-dialog.component.html',
    styleUrls  : ['./confirm-dialog.component.scss']
})
export class MatDialogComponent implements OnInit
{
    public confirmMessage: string;

    constructor(public dialogRef: MatDialogRef<MatDialogComponent>)
    {
    }

    ngOnInit()
    {
    }

}
