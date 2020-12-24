import { Component, OnInit } from '@angular/core';
import { JSEncrypt } from 'jsencrypt';
import { FormGroup, FormArray, FormBuilder, FormControl } from '@angular/forms';
import { Parameter, Channel } from './encrypted-param.model';
import { DataStorageService } from '../services/data-storage.service';
import { Observable } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-encrypted-param',
  templateUrl: './encrypted-param.component.html',
  styleUrls: ['./encrypted-param.component.css']
})
export class EncryptedParamComponent implements OnInit {

  result: string;
  forUse: string;
  showResult = false;
  channelName: string;
  addChannelChoice1: Boolean = true;
  addChannelChoice2: Boolean = false;

  encryptForm: FormGroup;
  params: FormArray;
  tempArrayParams: FormArray;
  channel: Channel = {};
  channelList: Channel[] ;
  channelSearchList: Channel[] = [] ;
  noEncrypt = false;
  API_ENC_KEY: string;

  public getChannel$: Observable<any>;

  constructor(private formBuilder: FormBuilder, private dataService: DataStorageService,
    public spinner: NgxSpinnerService, private toastr: ToastrService) { }


  ngOnInit() {

    this.fetchChannels();
    this.encryptForm = this.formBuilder.group({
      params: this.formBuilder.array([ this.createParamList() ]),
      encryptedPayLoad: new FormControl,
      channel: new FormControl,
      channelName: new FormControl,
      channelPublicKey: new FormControl,
      searchChannelName: new FormControl
    });
  }

  // needed when i wanted to deploy on firebase. got an issue with html page.
  get paramData() {
    return <FormArray> this.encryptForm.get('params');
  }

  // This is for showing alert
  showSuccess() {
    this.toastr.success('Channel Added Successfully!', 'Success!');
  }

  // function to get all channels from the db
  fetchChannels() {
    this.spinner.show();
    this.dataService.getChannels$().toPromise().then(
      (res: any) => {
        this.spinner.hide();
       console.log(res);
       this.channelList = this.generateIterableArray(res);
       this.channelSearchList = this.generateIterableArray(res);
       console.log(this.channelList);
      },
      (err: any) => {
       console.log(err);
       console.log('An error occurred');
   });
   }

   // this function makes my Array of objects iterable.
   generateIterableArray(obj) {
    return Object.keys(obj).map((key) => obj[key]);
  }

  // function to Insert Channel into the db
  insertChannel() {

    if (!this.encryptForm.controls.channelName.value || !this.encryptForm.controls.channelPublicKey.value) {
      this.toastr.error('Please fill input fields', 'Error!');
      return false;
    }


    const insertObject =  {
      'channelName': this.encryptForm.controls.channelName.value.toUpperCase(),
      'channelPublicKey': this.encryptForm.controls.channelPublicKey.value,
    };

    // compare channel to be inputed with existing channel
    const compareResult = this.channelList.some((element) => {
      // tslint:disable-next-line:triple-equals
      return insertObject.channelName === element.channelName;
    });

    console.log(compareResult);
    if (compareResult) {
      this.toastr.error('Channel name already exists. Kindly use existing channel or add unique channel', 'Error!');
      return false;
    } else {
      console.log(insertObject);
      this.spinner.show();
      this.dataService.insertChannels$(insertObject).toPromise().then(
        (res: any) => {
          this.spinner.hide();
          console.log('Successfully inserted into the db');
         console.log(res);
         this.fetchChannels();
          this.cancelInsert();
          this.showSuccess();
        },
        (err: any) => {
          console.log(err);
          console.log('An error occurred');
    });
    }

  }


  // This method is called when i select which channel i want to encrypt params for
  selectChannel(channel: Channel) {
    // this.cancelInsert();
    console.log(channel);
    this.channelName = channel.channelName;
    console.log(this.channelName);
    this.encryptForm.patchValue({
      searchChannelName: channel.channelName
    });
    this.API_ENC_KEY = channel.channelPublicKey;

    this.channelSearchList = this.channelList;
  }

// function pushes parameter field into the paramter array
  addParameter(): void {
    this.tempArrayParams = 
    this.params = this.encryptForm.get('params') as FormArray;
    this.params.push(this.createParamList());
  }

  createParamList(): FormGroup {
    return this.formBuilder.group({
      paramName: '',
      paramValue: '',
    });
  }


removeParameter(paramIndex: number): void {
  this.params = this.encryptForm.get('params') as FormArray;
  this.params.removeAt(paramIndex);
}


// Function to  loop through each parameter and encrypt them
public encryptFunction() {
  this.encryptForm.patchValue({
    encryptedPayLoad: ''
  });
  if (!this.API_ENC_KEY) {
    this.toastr.error('Please select channel!', 'Error!');
    return false;
  }
  this.tempArrayParams = {...this.encryptForm.controls.params.value};
  console.log(this.tempArrayParams);

  //the getRawValue method on the formgroup helps to get a copy of the form group amd make changes to the value without affecting the original value of the form group.
 
  const temp1 = this.encryptForm.getRawValue();

  const temp = temp1.params;
  // tslint:disable-next-line:prefer-const
  let body: any = {};
  temp.forEach(element => {
    
    element.paramValue = this.encryptData(element.paramValue);
    // tslint:disable-next-line:prefer-const
    let res = element.paramName;
    body[res] = element.paramValue;
  });

  console.log(JSON.stringify(body));
  this.encryptForm.controls.encryptedPayLoad.setValue(JSON.stringify(body));
  this.showResult = true;
}

 // encrypt function
  public encryptData(data: string) {
    const encrypt = new JSEncrypt();
    try {
      encrypt.setPublicKey(this.API_ENC_KEY);
      return encrypt.encrypt(data);
    } catch (e) {
      console.log(e);
    }
  }

  public ResetEncryption() {
    console.log('clear');
    this.encryptForm.patchValue({
      encryptedPayLoad: ''
    });
    this.showResult = false;
  }

  public Reset() {
    this.encryptForm.patchValue({
      encryptedPayLoad: ''
    });
    if(this.params.length > 1){
      for (let index = 0; index < this.params.length; index++) {
        if (index != 0) {
          this.removeParameter(index);
        }      
      }
    }

    this.showResult = false;
  }

  public addChannel() {
    this.addChannelChoice1 = false;
    this.addChannelChoice2 = true;
  }
  // Removes the Add channel field from DOM
  public cancelInsert() {
    this.addChannelChoice2 = false;
    this.addChannelChoice1 = true;
  }



    // This is for showing alert
  SearchChannel() {
    var filterValue = this.encryptForm.get("searchChannelName").value;

    if (filterValue && filterValue !== '') {
      // console.log(event);
      this.channelSearchList = this.channelSearchList.filter(res => {
        return res.channelName.toLocaleUpperCase().indexOf(filterValue.toLocaleUpperCase()) > -1;
      });
    } else {
      this.channelSearchList = this.channelList;
    }
    // .indexOf(val.toLowerCase()) > -1

    // if (val && val.trim() != '') {
    //   this.filtered = this.beneficiaries.filter((b) => {
    //     return (b.name.toLowerCase().indexOf(val.toLowerCase()) > -1 || b.bank.toLowerCase().indexOf(val.toLowerCase()) > -1 || b.accountNumber.toLowerCase().indexOf(val.toLowerCase()) > -1);
    //   })
    // }
    //this.toastr.success('Channel Added Successfully!', 'Success!');
  }


}
