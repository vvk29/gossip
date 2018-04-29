import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, LoadingController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { SignupPage } from '../signup/signup';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { GlobalsProvider } from '../../providers/globals/globals';

@IonicPage()
@Component({
	selector: 'page-login',
	templateUrl: 'login.html',
})
export class LoginPage {
	public loginForm;
	user: {email: string, password: string} = {email: '', password: ''};

	invalidForm: boolean = false;

	constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public formBuilder: FormBuilder, public menuCtrl: MenuController, public fireBase: FirebaseProvider, public globals: GlobalsProvider) {
		this.initializeLoginForm();
	}

	ionViewWillEnter() {
		this.menuCtrl.swipeEnable(false);
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad LoginPage');
	}

	ionViewWillLeave() {
		this.menuCtrl.swipeEnable(true);
	}

	initializeLoginForm() {
		this.loginForm = this.formBuilder.group({
			email: ['', Validators.compose([Validators.required])],
			password: ['', Validators.compose([Validators.required])]
		});
	}

	clearErrors() {
		// Reset Form Error
		this.invalidForm = false;
	}

	loginUser() {
		var loader = this.loadingCtrl.create({
			spinner: 'crescent',
			content: 'Signing you in'
		});

		loader.present();

		if (!this.loginForm.valid) {
			console.log('Form Fileds Error', this.loginForm);
			this.invalidForm = true;
			loader.dismiss();
		} else {
			var formData = this.loginForm.value;
			this.fireBase.loginUser(formData).then((data: any) => {
				if (data.success) {
					this.globals.userId = data.userId;
				}
				console.log('Login Data ', data);
				loader.dismiss();
			}).catch((err) => {
				console.log('Logging Error ', err);
				loader.dismiss();
			});
		}
	}

	goToSignUpPage() {
		this.navCtrl.push(SignupPage);
	}

}
