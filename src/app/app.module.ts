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
    declarations: [AppComponent],
    providers: [AuthGuard, ApiService],
    bootstrap: [AppComponent]
})
export class AppModule {}
