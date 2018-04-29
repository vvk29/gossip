import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ChatProvider {

	constructor(public http: HttpClient) {
		console.log('Hello ChatProvider Provider');
	}
}

// Test to check 

