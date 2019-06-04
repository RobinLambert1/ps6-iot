import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HomePage} from "../home/home";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Student} from "../../models/student";
import {ConnectionApiProvider} from "../../providers/connection-api/connection-api";
import {StudentHomePage} from "../student-home/student-home";

/**
 * Generated class for the ConnectionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-connection',
  templateUrl: 'connection.html',
})
export class ConnectionPage {

  public studentForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public formBuilder: FormBuilder, public connection: ConnectionApiProvider) {

    this.studentForm = this.formBuilder.group({
      email: [''],
      password: [''],
    });
  }


  ionViewDidLoad() {

  }

  tryToConnect() {
    const userToConnect: Student = this.studentForm.getRawValue() as Student;
    this.connection.connectWithCredientials(userToConnect.email, userToConnect.password);
    this.connection.connection$.subscribe(connected => {
      if(connected){
        if(this.connection.isBRI){
          this.navCtrl.push(HomePage, {
            user: this.connection.user,
          });
        } else if (this.connection.isStudent){
          this.navCtrl.push(StudentHomePage, {
            user: this.connection.user,
          });
        }
      }
    })
  }

}
