import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { SiderbarComponent } from './shared/components/siderbar.component';
import { SiderbarItemsComponent } from './shared/components/siderbar-items.component';
import { HeaderComponent } from './shared/components/header.component';
import { FollowBarComponent } from './shared/components/follow-bar.component';
import { AvatarComponent } from './shared/components/avatar.component';
import { LoginModalComponent } from './shared/auth/login-modal/login-modal.component';
import { RegisterModalComponent } from './shared/auth/register-modal/register-modal.component';
import { ModalComponent } from './shared/components/modal.component';
import { ButtonComponent } from './shared/components/button.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserProfileComponent } from './user-profile/user-profile.component';


@NgModule({
  declarations: [
    LayoutComponent,
    SiderbarComponent,
    SiderbarItemsComponent,
    HeaderComponent,
    FollowBarComponent,
    AvatarComponent,
    LoginModalComponent,
    RegisterModalComponent,
    ModalComponent,
    ButtonComponent,
    UserProfileComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    ReactiveFormsModule
  ]
})
export class MainModule { }
