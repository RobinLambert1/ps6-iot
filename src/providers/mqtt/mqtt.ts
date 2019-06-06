import { Injectable } from '@angular/core';
import {MqttService} from "ngx-mqtt";
import {Field} from "../../models/field";

/*
  Generated class for the MqttProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MqttProvider {

  constructor(private mqttService: MqttService) {

  }

  /**
   * Need to have req.body defined to send value.
   * @param req
   */
  manageMqtt(req: Field) {
    if (req.mqtt) {
      console.log(req, this);
      this.mqttService.publish(req.mqtt.request, req.body[req.mqtt.msg])
        .subscribe(() => console.log());
    }
  }
}
