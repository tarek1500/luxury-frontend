import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { first } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
	hidePassword = true;
	isBusy = false;

	name = new FormControl('', [
		Validators.required
	]);
	email = new FormControl('', [
		Validators.required,
		Validators.email
	]);
	password = new FormControl('', [
		Validators.required
	]);
	country = new FormControl('', [
		Validators.required
	]);

	constructor(private authService: AuthService) { }

	ngOnInit(): void { }

	onRegister(event): void {
		this.isBusy = true;

		this.authService.register({
			name: this.name.value,
			email: this.email.value,
			password: this.password.value,
			country: this.country.value
		}, 'web').pipe(first()).subscribe(
			(next) => { },
			(error) => this.isBusy = false
		);
	}
}