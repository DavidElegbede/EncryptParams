import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { retry, tap } from 'rxjs/Operators';
import { Channel } from '../encrypted-param/encrypted-param.model';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(public http: HttpClient) {

  }


    // =========================== GET CHANNEL LIST ===========================

    getChannels$(): Observable<any> {
      console.log('i want to get stuff');
      return   this.http.get( 'https://encryptparam.firebaseio.com/channel.json')
      .pipe(
          tap(x => console.log(x))
      );
     }

    // =========================== GET CHANNEL LIST ===========================
    insertChannels$(params: Channel): Observable<any> {
      console.log('i want to insert stuff');
      return   this.http.post( 'https://encryptparam.firebaseio.com/channel.json', params)
      .pipe(
          tap(x => console.log(x))
      );
     }




}
