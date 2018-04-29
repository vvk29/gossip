import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GlobalsProvider } from '../../providers/globals/globals';
import { ChatPage } from '../chat/chat';

@IonicPage()
@Component({
	selector: 'page-friends',
	templateUrl: 'friends.html',
})
export class FriendsPage {
	friends: any = [];

	constructor(public navCtrl: NavController, public navParams: NavParams, public globals: GlobalsProvider) {
		this.initializeStartupData();
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad FriendsPage');
	}

	initializeStartupData() {
		this.friends = this.globals.friends;
		// console.log('Friends ', this.friends);
	}

	goToChat(friend) {
		this.navCtrl.push(ChatPage, { friend: friend });
	}

}
