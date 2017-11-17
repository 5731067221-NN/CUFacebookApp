import { Facebook } from '@ionic-native/facebook';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


/*
  Generated class for the HttpProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HttpProvider {
  APP_ID: number = 1894102183937616;
  token: string;

  constructor(public http: Http, public facebook: Facebook) {
    console.log('Hello HttpProvider Provider');
    this.token = 'EAAa6rQfXhlABAJGHMbq8qqJ5FQnVnsQdqH1bYBycGyBM7xiBgpw6JdKR6ElnptJGYg2VITnLpKIWv1njL8eU3I2bxksT86DakP3E7VbzKwYYIZCEfrWCAbCO86sbSs6M0LZAHNcw16jWkIf05gYAe1wwyUp4z26ZAgi4rPKs2sZA9nFZBZBBq49P5ZByDPZC0trmTi15jgVkVQZDZD';
  }
  init() {
    this.facebook.browserInit(this.APP_ID, "v2.10");
  }

  getToken() {
    this.facebook.getAccessToken().then(value => { this.token = value });
  }
  setHttpRequest(type, top, hour, day, month, year) {
    this.getToken();
    console.log("token: " + this.token);
    var request = 'http://192.168.43.75:8080/' + type + '?since=-';
    if (year != '0') {
      request += year + '%20years%20';
    }
    if (month != '0') {
      request += month + '%20months%20';
    }
    if (day != '0') {
      request += day + '%20days%20';
    }
    if (hour != '0') {
      request += hour + '%20hour%20';
    }
    if (top != '') {
      request += '&top=' + top;
    }
    request += '&access_token=' + this.token;
    console.log("req: " + request);
    return request;
  }

  getCommentsData(top, hour, day, month, year) {
    return this.http.get(
      this.setHttpRequest('comments', top, hour, day, month, year))
      .map(res => res.json());
  }
  
  getLikesData(top, hour, day, month, year) {
    return this.http.get(
      this.setHttpRequest('reactions', top, hour, day, month, year))
      .map(res => res.json());
  }

}
