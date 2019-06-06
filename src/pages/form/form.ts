import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Field} from "../../models/field";
import {GlobalApiProvider} from "../../providers/global-api/global-api";
import {HttpHeaders} from "@angular/common/http";
import {QueuePage} from "../queue/queue";
import {MessagePage} from "../message/message";
import {Item} from "../../models/Item";
import {MqttProvider} from "../../providers/mqtt/mqtt";

/**
 * Generated class for the FormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-form',
  templateUrl: 'form.html',
})
export class FormPage {
  requestField: Field;
  items: Item[];
  display: boolean = false;
  test: string ="";
  port: string;
  head: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public globalApiProvider: GlobalApiProvider,
              public mqttProvider: MqttProvider
              ) {


    this.head = "";
    this.items = [];
    this.requestField = this.navParams.get("item");
    this.mqttProvider.manageMqtt(this.requestField);
    this.port = this.navParams.get("port");
    this.requestField.requiredField.forEach(rf => {

      this.items.push(new class implements Item {
        type: string = rf.formatType;
        name: string = rf.showedName;
        value: string = rf.value;
      });
    });


  }

  ionViewDidLoad() {

  }


  displayPassword(){
    this.display = !this.display;
  }

  saveData(){
    let valuesToReplace: string[];
    for( let h of Object.keys(this.requestField["headers"])) {

      valuesToReplace = [];
      const val: string = this.requestField["headers"][h];
      let i: number;
      let isReplacable: boolean = false;

      for(i=0; i<val.length; i++) {

        if(val.charAt(i)==="$") {
          isReplacable = true;
          let valueToReplace: string = "";
          i++;
          while(val.charAt(i) !== "?") {
            valueToReplace = valueToReplace + val.charAt(i);
            i++;
          }
          valuesToReplace.push(valueToReplace);
        }
      }


      if(isReplacable) {
        for( let val of valuesToReplace) {

          for(let i of this.items) {
            if(i.type === val) {
              const vall = '$' +  val + '?';
              this.requestField["headers"][h] = this.requestField["headers"][h].replace(vall.toString(), i.value);
            }
          }
        }

      }
      const url = "http://" + this.port  + this.requestField.respUrl;
      const header = new HttpHeaders(this.requestField["headers"]);
      this.globalApiProvider.formRequest(this.requestField.method, url, undefined, {"headers": header})
        .subscribe(x => {
          if(x.type.toString() === "list"){
            this.navCtrl.push(QueuePage, {
              item: x
            });
          }
          if(x.type.toString() === "form"){
            this.navCtrl.push(FormPage, {
              item: x,
              port: this.port
            });
          }
          if (x.type.toString() === "msg"){
            this.navCtrl.push(MessagePage, {
              item: x
            })
          }
        });
    }
  }

}
