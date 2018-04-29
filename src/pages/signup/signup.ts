import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, LoadingController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { FirebaseProvider } from '../../providers/firebase/firebase';


@IonicPage()
@Component({
	selector: 'page-signup',
	templateUrl: 'signup.html',
})
export class SignupPage {
	public signupForm;
	user: { firstName: string, lastName: string, gender: string, userName: string, email: string, password: string } = { firstName: '', lastName: '', gender: '', userName: '', email: '', password: '' };

	returnInvalid: boolean = false;

	constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public formBuilder: FormBuilder, public menuCtrl: MenuController, private fireBase: FirebaseProvider) {
		this.initializeStartupData();
		this.initializeSignupForm();
	}

	ionViewWillEnter() {
		this.menuCtrl.swipeEnable(false);
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad SignupPage');
	}

	ionViewWillLeave() {
		this.menuCtrl.swipeEnable(true);		
	}

	initializeStartupData() {
		this.user.gender = 'male';
	}

	initializeSignupForm() {
		this.signupForm = this.formBuilder.group({
			firstName: ['', Validators.compose([Validators.required, Validators.pattern('^[a-z A-z]+$')])],
			lastName: ['', Validators.compose([Validators.required, Validators.pattern('^[a-z A-z]+$')])],
			gender: ['', Validators.compose([Validators.required])],			
			userName: ['', Validators.compose([Validators.required])],
			email: ['', Validators.compose([Validators.required])],
			password: ['', Validators.compose([Validators.required])]
		});
	}

	submitForm() {
		var loader = this.loadingCtrl.create({
			spinner: 'circle',
			content: 'Signing you in'
		});

		loader.present();
		// console.log('Form Submitted ', this.signupForm);
		if (!this.signupForm.valid) {
			// console.log('Error ', this.signupForm.value);
			this.returnInvalid = true;
			loader.dismiss();
		} else {
			// console.log('Success');
			var formData = this.signupForm.value;

			// Assign Placeholder Profile Url
			if (formData.gender == 'male') {
				formData.profileImg = 'assets/images/male-placeholder-img.jpg';
				
			} else if (formData.gender == 'female') {
				formData.profileImg = 'assets/images/female-placeholder-img.jpg';				
			}
			this.fireBase.registerUser(formData).then((data: any) => {
				console.log('Register Success ', data);
				loader.dismiss();
			}).catch((err) => {
				console.log('Register Error ', err);
			})
		}
	}

}
