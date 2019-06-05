import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {User} from "../../models/user";
import {BarcodeScanner, BarcodeScannerOptions} from '@ionic-native/barcode-scanner';

/**
 * Generated class for the StudentHomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-student-home',
  templateUrl: 'student-home.html',
})
export class StudentHomePage {

  student: User;
  scannedData: {};

  barCodeScannerOptions: BarcodeScannerOptions;

  constructor(public navCtrl: NavController, public navParams: NavParams, public barCodeScanner: BarcodeScanner) {
    //this.student = navParams.get('user');
    //this.initDate();

    this.barCodeScannerOptions = {
      showTorchButton: true,
      showFlipCameraButton: true
    }
  }

  ionViewDidLoad() {
  }

  private initDate(){
    if (this.student.studentInfo.appointment !== undefined) {
      this.student.studentInfo.appointment.timeSlot.departureTime =
        new Date(this.student.studentInfo.appointment.timeSlot.departureTime)
      this.student.studentInfo.appointment.timeSlot.endTime =
        new Date(this.student.studentInfo.appointment.timeSlot.endTime)
    }
  }

  scan() {
    this.barCodeScanner.scan().then(data => {
      console.log(data);
      this.scannedData = data;
    });
  }

}
