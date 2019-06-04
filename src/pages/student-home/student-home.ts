import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {User} from "../../models/user";

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.student = navParams.get('user');
    this.initDate()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StudentPage');
  }

  private initDate(){
    if (this.student.studentInfo.appointment !== undefined) {
      this.student.studentInfo.appointment.timeSlot.departureTime =
        new Date(this.student.studentInfo.appointment.timeSlot.departureTime)
      this.student.studentInfo.appointment.timeSlot.endTime =
        new Date(this.student.studentInfo.appointment.timeSlot.endTime)
    }
  }

}
