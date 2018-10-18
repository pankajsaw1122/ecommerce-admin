import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ApiService } from './shared/services/api.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared';
import { MaterialModule } from './material.module';
import { ConfirmDialogComponent } from './shared/confirm-dialog/confirm-dialog.component';
import { ConfirmAskComponent } from './shared/confirm-ask/confirm-ask.component';

// AoT requires an exported function for factories

import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        FormsModule,
        MaterialModule,
        HttpModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AppRoutingModule
    ],
    declarations: [AppComponent, ConfirmDialogComponent, ConfirmAskComponent],
    providers: [AuthGuard, ApiService],
    entryComponents: [ ConfirmDialogComponent, ConfirmAskComponent],
    bootstrap: [AppComponent]
})
export class AppModule {}
