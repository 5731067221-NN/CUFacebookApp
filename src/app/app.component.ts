import { Globals } from './app.config';
import { BackbuttonService } from './../services/backbutton.service';
import { Facebook } from '@ionic-native/facebook';
import { Component, ViewChild } from '@angular/core';
import { Platform, App, LoadingController, Nav, MenuController, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = HomePage;
  @ViewChild(Nav) nav: Nav;
  alert;
  pages: Array<{ title: string; component: any }>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    app: App,
    private alertController: AlertController,
    public menu: MenuController,
    private toastController: ToastController,
    loadingController: LoadingController,
    private backbuttonService: BackbuttonService) {
      this.initializeApp();

      // used for an example of ngFor and navigation
      
      this.registerBackButton();
    }
  
    initializeApp() {
      this.platform.ready().then(() => {
        // Okay, so the platform is ready and our plugins are available.
        // Here you can do any higher level native things you might need.
        this.statusBar.styleDefault();
        this.splashScreen.hide();
      });
    }
  
    openPage(page) {
      // Reset the content nav to have just this page
      // we wouldn't want the back button to show in this scenario
      // this.nav.setRoot(page.component);
      this.nav.push(page.component);
    }
  
    registerBackButton() {
      this.platform.registerBackButtonAction(() => {
  
        if (this.menu.isOpen()) {
          console.log("Menu is open!", "loggedInMenu");
          this.menu.close();
          console.log("this.menu.isOpen(): " + JSON.stringify(this.menu.isOpen()));
          return;
        }
        console.log("Checking for other pages");
  
        let checkHomePage = true;
        let max = Globals.navCtrls.length;
        for (let i = 0; i < Globals.navCtrls.length; i++) {
          let n = Globals.navCtrls[i];
          if (n) {
            if (n.canGoBack()) {
              console.log("Breaking the loop i: " + JSON.stringify(i));
              let navParams = n.getActive().getNavParams();
              if (navParams) {
                console.log("navParams exists");
                let resolve = navParams.get("resolve");
                if (resolve) {
                  n.pop().then(() => resolve({}));
                } else {
                  n.pop();
                }
              } else {
                n.pop();
              }
              checkHomePage = false;
              return;
            }
          } else console.log("n was null!");
        }
  
        if (this.nav.getActive().instance instanceof HomePage && !this.nav.canGoBack()) {
          let popPageVal = this.backbuttonService.popPage();
          console.log("popPageVal: " + JSON.stringify(popPageVal));
          if (popPageVal >= 0) {
            console.log("Switching the tab to: ", popPageVal);
            this.switchTab(popPageVal);
          } else {
            console.log("Last page is HomePage");
  
            if (this.alert) {
              this.alert.dismiss();
              this.alert = null;
            } else {
              this.showAlert();
            }
          }
        } else {
          console.log("Last page is not HomePage");
          if (this.nav.canGoBack()) {
            console.log("We can go back!");
            this.nav.pop();
          }
        }
      });
    }
  
    showAlert() {
      this.alert = this.alertController.create({
        title: "Exit?",
        message: "Are you sure you want to exit?",
        buttons: [
          {
            text: "Cancel",
            role: "cancel",
            handler: () => {
              this.alert = null;
            }
          },
          {
            text: "Exit",
            handler: () => {
              this.platform.exitApp();
            }
          }
        ]
      });
      this.alert.present();
    }
  
    switchTab(tabIndex) {
      if (Globals.tabs && tabIndex >= 0) {
        console.log("Switch condition met");
        Globals.tabIndex = tabIndex;
        Globals.tabs.select(tabIndex);
        Globals.tabs.selectedIndex = tabIndex;
      }
    }
}

