import { NgModule } from '@angular/core';
import { SharedModule } from 'shared/shared.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserUndeadComponent } from './components/user-undead/user-undead.component';
import { AuthGuard } from 'shared/services/auth-guard.service';
import { CreateUndeadComponent } from './components/create-undead/create-undead.component';
import { EditUndeadComponent } from './components/edit-undead/edit-undead.component';

@NgModule({
  imports: [
    FormsModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: 'undead/new',
        component: CreateUndeadComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'undead/:id',
        component: EditUndeadComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'undead',
        component: UserUndeadComponent,
        canActivate: [AuthGuard]
      },
    ])
  ],
  declarations: [
    CreateUndeadComponent,
    UserUndeadComponent,
    EditUndeadComponent
  ],
  exports: [
    EditUndeadComponent
  ]
})
export class CreatorModule { }
