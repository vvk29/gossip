import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase';

@IonicPage()
@Component({
	selector: 'page-chat',
	templateUrl: 'chat.html',
})
export class ChatPage {
	@ViewChild('myInput') myInput: ElementRef;
	
	friend: any;
	message: string = '';
	constructor(public navCtrl: NavController, public navParams: NavParams, public firebase: FirebaseProvider) {
		this.initializeStartupData();
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad ChatPage');
	}

	initializeStartupData() {
		this.friend = this.navParams.get('friend');
	}

	resize() {
		this.myInput.nativeElement.style.height = this.myInput.nativeElement.scrollHeight + 'px';
		// console.log('Scroll Height ', this.myInput.nativeElement.style.height);
	}

	sendMessage() {
		var message = this.message;

		var friend = this.friend;
		this.firebase.sendMessage(friend).then(() => {
			console.log("message sent");
		}).catch((err) => {
			console.log('Message Sent Err: ', err);
		});
	}
}
