import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormBuilder, FormGroup, FormArray, FormControl} from '@angular/forms';
import {Field} from "../../models/field";
import {Item} from "../../models/Item";

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder,
              ) {
    this.items = [];
    this.requestField = this.navParams.get("item");
    this.requestField.requiredField.forEach(rf => {
      /*let formGroup;
      formGroup = this.formBuilder.group({
        name: rf.showedName,
        value: rf.value
      });
      console.log(formGroup.value);
      this.items.push(formGroup);*/

      this.items.push(new class implements Item {
        type: string = rf.formatType;
        name: string = rf.showedName;
        value: string = rf.value;
      });
    });
    console.log(this.items);

  }

  ionViewDidLoad() {

  }

}
