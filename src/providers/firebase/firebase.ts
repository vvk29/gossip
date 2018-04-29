// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import * as moment from 'moment';
import { GlobalsProvider } from '../globals/globals';

import * as _ from 'lodash';

@Injectable()
export class FirebaseProvider {

	constructor(/* public http: HttpClient */public globals: GlobalsProvider) {
		console.log('Hello FirebaseProvider Provider');
	}

	registerUser(formData) {
		var email = formData.email;
		var password = formData.password;
		var joinedAt = moment().format();

		return new Promise((resolve, reject) => {
			firebase.auth().createUserWithEmailAndPassword(email, password).then((newUser) => {
				delete formData.password;
				
				var userId = newUser.uid;

				formData.id = userId;
				formData.deviceToken = 'default';
				formData.joinedAt = joinedAt;

				var dbRef = firebase.database().ref('/users').child(userId);
				dbRef.set(formData).then(() => {
					resolve({success: true, msg: 'Registered Successfully!'});
				});

			}).catch((err) => {
				reject(err);
			});
		});
	}

	loginUser(formData) {
		var email = formData.email;
		var password = formData.password;

		return new Promise((resolve, reject) => {
			firebase.auth().signInWithEmailAndPassword(email, password).then((data) => {
				resolve({success: true, userId: data.uid})
			}).catch((err) => {
				reject(err);
			});
		});
	}

	getCurrentUserData() {
		var userId = this.globals.userId;
		return new Promise((resolve, reject) => {
			var dbRef = firebase.database().ref('/users').child(userId);
			dbRef.on("value", (users) => {
				var usersObj = users.val();

				resolve(usersObj);
			});
		});
	}

	getAllUsers() {
		var userId = this.globals.userId;
		
		return new Promise((resolve, reject) => {
			var dbRef = firebase.database().ref('/users');
			dbRef.on("value", (users) => {
				// console.log('Users ', users.val());
			
				var usersArr = [];
				usersArr = _.toArray(users.val());
				// Remove Current Logged In User
				_.remove(usersArr, { 'id': userId });

				this.globals.friends = usersArr;

				// console.log('Users Af', usersArr);

				resolve(usersArr);
			});
		});
	}

	checkForExistingChat(userId, friendId) {
		return new Promise((resolve) => {
			// Check For Existing Chats, if both user and friend exists
			var chatRef = firebase.database().ref('/chats');
			chatRef.once('value', (chats) => {

				if (chats.val()) {
					var chatsObj = chats.val();

					var chasArr = _.toArray(chatsObj);
					for (let i = 0; i < chasArr.length; i++) {
						var chat = chasArr[i];
						if ((chat.participants.p1 == userId && chat.participants.p2 == friendId) || (chat.participants.p1 == friendId && chat.participants.p2 == userId)) {
							resolve({success: true, msg: 'ChatFound', chatId: chat.id});
						} else {
							resolve({ success: false, msg: 'ChatNotFound'});
						}
					}
				} else {
					resolve({ success: false, msg: 'ChatNotFound' });
				}
			});
		});
	}

	sendMessage(friend) {
		var userId = this.globals.userId;
		var friendId = friend.id;

		return new Promise((resolve, reject) => {

			this.checkForExistingChat(userId, friendId).then((data: any) => {
				console.log('ExistingChat Status => ', data);
			});

			/* var chatRef = firebase.database().ref('/chats').push();			
			var newChatId = chatRef.key;

			chatRef.set({
				id: newChatId
			}).then(() => {
				
				resolve();
			}).catch((err) => {
				reject(err);
			}); */
		});
	}

}
