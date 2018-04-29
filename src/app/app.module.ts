import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { ChatPage } from "../pages/chat/chat";
import { LoginPage } from "../pages/login/login";
import { SignupPage } from "../pages/signup/signup";


import { ChatProvider } from '../providers/chat/chat';
import { FirebaseProvider } from '../providers/firebase/firebase';
import { GlobalsProvider } from '../providers/globals/globals';
import { UtilitiesProvider } from '../providers/utilities/utilities';
import { TabsPage } from '../pages/tabs/tabs';
import { FriendsPage } from '../pages/friends/friends';
import { ProfilePage } from '../pages/profile/profile';

@NgModule({
	declarations: [
		MyApp,
		HomePage,
		ChatPage,
		LoginPage,
		SignupPage,
		TabsPage,
		FriendsPage,
		ProfilePage
	],
	imports: [
		BrowserModule,
		IonicModule.forRoot(MyApp, {
			tabsHideOnSubPages: true
		})
	],
	bootstrap: [IonicApp],
	entryComponents: [
		MyApp,
		HomePage,
		ChatPage,
		LoginPage,
		SignupPage,
		TabsPage,
		FriendsPage,
		ProfilePage
	],
	providers: [
		StatusBar,
		SplashScreen,
		{ provide: ErrorHandler, useClass: IonicErrorHandler },
		ChatProvider,
		FirebaseProvider,
		GlobalsProvider,
		UtilitiesProvider
	]
})
export class AppModule { }
