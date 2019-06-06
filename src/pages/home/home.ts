import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {BarcodeScanner, BarcodeScannerOptions} from "@ionic-native/barcode-scanner";
import {GlobalApiProvider} from "../../providers/global-api/global-api";
import {FormBuilder, FormGroup} from "@angular/forms";
import {QueuePage} from "../queue/queue";
import {MessagePage} from "../message/message";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  scannedData: {};
  form: FormGroup;
  barCodeScannerOptions: BarcodeScannerOptions;

  message: string;
  error: boolean;

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

    this.error = false;
  }

  ionViewDidLoad() {
  }

  scan() {
    this.barCodeScanner.scan().then(data => {
      this.scannedData = data;
      this.globalApi.getRequest(data.text).subscribe(x => {
      }, err => {
        this.error = true;
        this.message = "Le QR code ne correspond à aucune requête, veuillez scanner à nouveau un QR code";
      })
    }).catch(err => {
      console.log(err);
      this.error = true;
      this.message = "Veuillez scanner un QR code valide";
    });
  }

  getRequest(){
    this.globalApi.getRequest(this.form.value.request).subscribe(x => {
      if(x.type === "list"){
        this.navCtrl.push(QueuePage, {
          item: x
        });
      }
    })
  }

  putRequest() {
    this.globalApi.putRequest(this.form.value.request, {}).subscribe( x=> {
      if (x.type === "msg"){
        this.navCtrl.push(MessagePage, {
          item: x
        })
      }
      }

    )
  }

}

