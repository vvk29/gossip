import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ChatPage } from '../chat/chat';
import { FriendsPage } from '../friends/friends';
import { ProfilePage } from '../profile/profile';

@IonicPage()
@Component({
	selector: 'page-tabs',
	templateUrl: 'tabs.html',
})
export class TabsPage {

	tab1Root: any = FriendsPage;
	tab2Root: any = ChatPage;
	tab3Root: any = ProfilePage;

	constructor(public navCtrl: NavController, public navParams: NavParams) {
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad TabsPage');
	}

}
