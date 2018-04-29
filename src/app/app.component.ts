import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from "../pages/login/login";
import { ChatPage } from '../pages/chat/chat';
import { SignupPage } from '../pages/signup/signup';

import * as firebase from 'firebase';
import { TabsPage } from '../pages/tabs/tabs';
import { GlobalsProvider } from '../providers/globals/globals';
import { FirebaseProvider } from '../providers/firebase/firebase';

interface PageInterface {
	title: string,
	component: string
}
@Component({
	templateUrl: 'app.html'
})
export class MyApp {
	@ViewChild(Nav) nav: Nav;

	rootPage: any = '';

	pages: any[] = [
		{title: 'Logout', component: 'LoginPage'}
	];

	constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public globals: GlobalsProvider, public fireProvider: FirebaseProvider) {
		this.initializeFirebase();
		this.checkLoggedInStatus();

		platform.ready().then(() => {
			// Okay, so the platform is ready and our plugins are available.
			// Here you can do any higher level native things you might need.
			statusBar.styleDefault();
			splashScreen.hide();
		});
	}

	initializeFirebase() {
		// Initialize Firebase
		var config = {
			apiKey: "AIzaSyBvYOeVW9_p2WvRueqJXz1KwfG8ERM6vK4",
			authDomain: "gossip-5efaa.firebaseapp.com",
			databaseURL: "https://gossip-5efaa.firebaseio.com",
			projectId: "gossip-5efaa",
			storageBucket: "",
			messagingSenderId: "1070527783055"
		};
		firebase.initializeApp(config);
	}

	checkLoggedInStatus() {
		firebase.auth().onAuthStateChanged((user) => {
			console.log('Logged In User ', user);

			if (!user) {
				this.rootPage = LoginPage;
			} else {
				this.assignGlobalVariables(user).then(() => {
					console.log('Globals ', this.globals);
					this.getAllUser().then(() => {
						this.rootPage = TabsPage;
					});
				});
			}
		});
	}

	assignGlobalVariables(user) {
		return new Promise((resolve, reject) => {
			this.globals.userId = user.uid;
			this.fireProvider.getCurrentUserData().then((currentUserData) => {
				this.globals.userData = currentUserData;

				resolve();
			});
		});
	}

	getAllUser() {
		return new Promise((resolve, reject) => {
			this.fireProvider.getAllUsers().then((users)=> {
				resolve();
			});

		});
	}

	openPage(page) {
		// Reset the content nav to have just this page
		// we wouldn't want the back button to show in this scenario
		this.nav.setRoot(page.component);
	}
}

