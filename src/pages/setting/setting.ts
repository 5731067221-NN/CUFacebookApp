import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import { App } from 'ionic-angular';

/**
 * Generated class for the SettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {
  homePage:HomePage
  constructor(public navCtrl: NavController, public navParams: NavParams,private facebook:Facebook,private app:App) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingPage');
  }
  getAccess(){
    var token = this.facebook.getAccessToken()
    console.log(token);
    alert(token);
  }
  logout() {
    this.facebook.logout().then((response) =>{
      alert(JSON.stringify(response));
      
    }, (error) => {
      alert(error);
    })
    let nav = this.app.getRootNav();
    nav.push(HomePage);
  }

}