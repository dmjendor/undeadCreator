import { NgModule } from '@angular/core';

import { ManageMonstersComponent } from './components/manage-monsters/manage-monsters.component';
import { SharedModule } from 'shared/shared.module';
import { RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AdminAuthGuard } from './services/admin-auth-guard.service';
import { MonsterFormComponent } from './components/monster-form/monster-form.component';
import { ManageUndeadComponent } from './components/manage-undead/manage-undead.component';
import { AuthGuard } from 'shared/services/auth-guard.service';
import { EditWeaponsComponent } from './components/edit-weapons/edit-weapons.component';
import { WeaponFormComponent } from './components/weapon-form/weapon-form.component';


@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: 'admin/monsters/new',
        component: MonsterFormComponent,
        canActivate: [AuthGuard, AdminAuthGuard]
    },
    {
        path: 'admin/monsters/:id',
        component: MonsterFormComponent,
        canActivate: [AuthGuard, AdminAuthGuard]
    },
    {
      path: 'admin/monsters',
      component: ManageMonstersComponent,
      canActivate: [AuthGuard, AdminAuthGuard]
    },
    {
      path: 'admin/undead',
      component: ManageUndeadComponent,
      canActivate: [AuthGuard, AdminAuthGuard]
    },
    {
      path: 'admin/weapons/new',
      component: WeaponFormComponent,
      canActivate: [AuthGuard, AdminAuthGuard]
    },
    {
        path: 'admin/weapons/:id',
        component: WeaponFormComponent,
        canActivate: [AuthGuard, AdminAuthGuard]
    },
    {
      path: 'admin/weapons',
      component: EditWeaponsComponent,
      canActivate: [AuthGuard, AdminAuthGuard]
    }
    ])
  ],
  declarations: [
    ManageMonstersComponent,
    ManageUndeadComponent,
    MonsterFormComponent,
    EditWeaponsComponent,
    WeaponFormComponent,
  ],
  providers: [
    AdminAuthGuard
  ]
})
export class AdminModule { }
