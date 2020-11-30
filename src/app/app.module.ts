import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { HomeComponent } from './home';
import { UserListComponent } from './user';
import { LoginComponent } from './login';
import {PollListComponent} from '@app/poll/poll-list.component';
import {PollEditComponent} from '@app/poll/poll-edit/poll-edit.component';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {QuestionEditComponent} from '@app/question/question-edit/question-edit.component';
import {OptionEditComponent} from '@app/option/option-edit/option-edit.component';
import {JoinComponent} from '@app/join/join.component';
import {ResultComponent} from "@app/result/result.component";
@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        ToastrModule.forRoot()
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        PollListComponent,
        PollEditComponent,
        QuestionEditComponent,
        OptionEditComponent,
        UserListComponent,
        ResultComponent,
        JoinComponent,
        LoginComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    ],
    bootstrap: [AppComponent]
})

export class AppModule {}
