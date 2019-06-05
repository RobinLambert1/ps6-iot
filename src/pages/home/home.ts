import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {BarcodeScanner, BarcodeScannerOptions} from "@ionic-native/barcode-scanner";
import {GlobalApiProvider} from "../../providers/global-api/global-api";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  scannedData: {};
  res: any;
  form: FormGroup;
  barCodeScannerOptions: BarcodeScannerOptions;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public barCodeScanner: BarcodeScanner, public globalApi: GlobalApiProvider,
              public formBuilder: FormBuilder) {

    this.form = this.formBuilder.group({
      request: ['']
    });

    this.barCodeScannerOptions = {
      showTorchButton: true,
      showFlipCameraButton: true
    }
  }

  ionViewDidLoad() {
  }

  scan() {
    this.barCodeScanner.scan().then(data => {
      this.scannedData = data;
      this.globalApi.requestQrResult(data.text).subscribe(x => {
        console.log('result');
        console.log(x);
        this.res = x;
      })
    }).catch(err => {
      console.log(err);
    });
  }

  getRequest(){
    this.globalApi.requestQrResult(this.form.value.request).subscribe(x => {
      console.log(x);
    })
  }

}

