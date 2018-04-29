// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class GlobalsProvider {
  userId: string = '';
  userData: any;

  friends: any = [];

  constructor(/* public http: HttpClient */) {
    console.log('Hello GlobalsProvider Provider');
  }

  clear() {
    this.userId = undefined;
    this.userData = undefined;

    this.friends = undefined;
  }

}
