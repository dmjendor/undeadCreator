import { NgModule } from '@angular/core';
import { SharedModule } from 'shared/shared.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserUndeadComponent } from './components/user-undead/user-undead.component';
import { AuthGuard } from 'shared/services/auth-guard.service';
import { CreateUndeadComponent } from './components/create-undead/create-undead.component';

@NgModule({
  imports: [
    FormsModule,
    SharedModule,
    RouterModule.forChild([
      { path: 'createUndead', component: CreateUndeadComponent, canActivate: [AuthGuard] },
      { path: 'undead', component: UserUndeadComponent, canActivate: [AuthGuard] },
    ])
  ],
  declarations: [
    CreateUndeadComponent,
    UserUndeadComponent
  ]
})
export class CreatorModule { }
