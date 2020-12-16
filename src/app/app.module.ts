import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoginComponent } from './login/login.component';
import { EncryptedParamComponent } from './encrypted-param/encrypted-param.component';
import { HttpClientModule } from '@angular/common/http';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HomePageComponent } from './home-page/home-page.component';
import { SerializeParamComponent } from './serialize-param/serialize-param.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EncryptedParamComponent,
    HomePageComponent,
    SerializeParamComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    DataStorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
