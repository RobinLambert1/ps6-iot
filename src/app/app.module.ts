import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import {BarcodeScanner} from "@ionic-native/barcode-scanner";

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { BriApiProvider } from '../providers/bri-api/bri-api';
import { HttpClientModule} from "@angular/common/http";
import { ConnectionApiProvider } from '../providers/connection-api/connection-api';
import { GlobalApiProvider } from '../providers/global-api/global-api';
import { QueuePage } from "../pages/queue/queue";
import { FormPage} from "../pages/form/form";
import { MessagePage} from "../pages/message/message";

import {
  MqttModule,
  IMqttServiceOptions, MqttService
} from 'ngx-mqtt';

import { MqttProvider } from '../providers/mqtt/mqtt';

export function mqttServiceFactory(){
  return new MqttService(MQTT_SERVICE_OPTIONS);
}
const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
  hostname: 'localhost',
  port: 9001,
  path: ''
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    QueuePage,
    FormPage,
    MessagePage

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    IonicModule,
    MqttModule.forRoot({
      provide: MqttService,
      useFactory: mqttServiceFactory
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    QueuePage,
    FormPage,
    MessagePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BriApiProvider,
    ConnectionApiProvider,
    BarcodeScanner,
    GlobalApiProvider,
    MqttProvider
  ]
})
export class AppModule {}
