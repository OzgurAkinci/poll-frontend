import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { UserListComponent } from './user';
import { LoginComponent } from './login';
import { AuthGuard } from './_helpers';
import { RoleEnum } from './_models';
import {PollEditComponent} from '@app/poll/poll-edit/poll-edit.component';
import {PollListComponent} from '@app/poll/poll-list.component';
import {QuestionEditComponent} from "@app/question/question-edit/question-edit.component";
import {OptionEditComponent} from "@app/option/option-edit/option-edit.component";

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuard],
        data: { roles: [RoleEnum.END, RoleEnum.ADMIN] }
    },
    {
        path: 'users',
        component: UserListComponent,
        canActivate: [AuthGuard],
        data: { roles: [RoleEnum.ADMIN] }
    },
    {
      path: 'polls',
      component: PollListComponent,
      canActivate: [AuthGuard],
      data: { roles: [RoleEnum.END, RoleEnum.ADMIN] }
    },
    {
      path: 'poll-edit/:id',
      component: PollEditComponent,
      canActivate: [AuthGuard],
      data: { roles: [RoleEnum.ADMIN] }
    },
    {
      path: 'question-edit/:pollId/:id',
      component: QuestionEditComponent,
      canActivate: [AuthGuard],
      data: { roles: [RoleEnum.ADMIN] }
    },
    {
      path: 'option-edit/:questionId/:id',
      component: OptionEditComponent,
      canActivate: [AuthGuard],
      data: { roles: [RoleEnum.ADMIN] }
    },
    {
        path: 'login',
        component: LoginComponent
    },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
