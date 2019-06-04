import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { BriApiProvider } from '../providers/bri-api/bri-api';
import { HttpClientModule} from "@angular/common/http";
import {ConnectionPage} from "../pages/connection/connection";
import { ConnectionApiProvider } from '../providers/connection-api/connection-api';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ConnectionPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    IonicModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ConnectionPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BriApiProvider,
    ConnectionApiProvider
  ]
})
export class AppModule {}
