﻿import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '@app/_services';

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    error = '';
    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        if (this.authenticationService.authValue) {
            this.router.navigate(['/']);
        }
    }

    ngOnInit(): any {
        this.loginForm = this.formBuilder.group({
            username: ['ozgurakinci', Validators.required],
            password: ['2', Validators.required]
        });
    }

    // convenience getter for easy access to form fields
    get f(): any { return this.loginForm.controls; }

    onSubmit(): any {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.login(this.f.username.value, this.f.password.value).subscribe(data => {

        }, err => {
          this.error = JSON.stringify(err);
          this.loading = false;
        });
    }
}
