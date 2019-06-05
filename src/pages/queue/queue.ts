import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Field} from "../../models/field";

/**
 * Generated class for the QueuePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-queue',
  templateUrl: 'queue.html',
})
export class QueuePage {

  field: Field;
  values: any[][];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.values = [];
    this.field = this.navParams.get("item");

    for (let i = 0; i < this.field.queue.length; i++) {
      const listValue = Object.keys(this.field.queue[i]).filter(x => {
        if(x !== 'allElem'){
          const display = this.field.queue[i][x]["visible"];
          if(display !== undefined){
            if(display === true) return true;
          }
        }
      });
      this.values.push(listValue);
    }
    console.log(this.values);
  }

  drawItem(index: number, item: any){
    if(this.field.queue[index][item]["display"] === undefined)
      return this.field.queue[index][item]["value"];
    return this.field.queue[index][item]["display"] + ': ' + this.field.queue[index][item]["value"];
  }

  drawColor(index: number){
    return this.field.queue[index]["allElem"]["background_color"];
  }
}
