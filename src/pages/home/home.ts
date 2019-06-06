import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {BarcodeScanner, BarcodeScannerOptions} from "@ionic-native/barcode-scanner";
import {GlobalApiProvider} from "../../providers/global-api/global-api";
import {FormBuilder, FormGroup} from "@angular/forms";
import {QueuePage} from "../queue/queue";
import {FormPage} from "../form/form";
import {MessagePage} from "../message/message";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  scannedData: {};
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
      this.globalApi.getRequest(data.text).subscribe(x => {
        if(x.type === "list"){
          this.navCtrl.push(QueuePage, {
            item: x
          });
        }
      })
    }).catch(err => {
      console.log(err);
    });
  }

  getRequest(){
    this.globalApi.getRequest(this.form.value.request).subscribe(x => {
      if(x.type === "list"){
        this.navCtrl.push(QueuePage, {
          item: x
        });
      }
      if(x.type === "form"){
        this.navCtrl.push(FormPage, {
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

