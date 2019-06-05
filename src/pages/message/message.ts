import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Field} from "../../models/field";

/**
 * Generated class for the MessagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-message',
  templateUrl: 'message.html',
})
export class MessagePage {

  field: Field;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.field = this.navParams.get('item');
  }

  ionViewDidLoad() {

  }

}
