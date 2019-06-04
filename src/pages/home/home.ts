import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {BriApiProvider} from "../../providers/bri-api/bri-api";
import {User} from "../../models/user";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  appointmentOfTheDay: any[] = [];

  bri: User;

  colorByStatus = {
    none: '#FFFFFF',
    waiting: '#98FB98',
    inProcess: '#00aeef',
    done: '#C0C0C0'
  };

  constructor(public navCtrl: NavController, public briProvider: BriApiProvider, public navParams: NavParams) {
    this.bri = navParams.get('user');
    this.getAppointment();

  }

  getAppointment() {
    this.briProvider.getAppointmentOfTheDay(this.bri._id).subscribe(appointment => {
      if (appointment !== undefined) {
        const available = [];
        appointment.forEach(a => {
          a.available.forEach(av => available.push((av)));
        });
        // convert to date
        available.map(a => {
          a.slot.departureTime = new Date(a.slot.departureTime);
          a.slot.endTime = new Date(a.slot.endTime);
        });
        this.appointmentOfTheDay = available.filter(a => a.reservedBy !== undefined);
      }
    });
  }

}
