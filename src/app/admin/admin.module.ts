import { NgModule } from '@angular/core';

import { ManageMonstersComponent } from './components/manage-monsters/manage-monsters.component';
import { SharedModule } from 'shared/shared.module';
import { RouterModule } from '@angular/router';
import { AdminAuthGuard } from './services/admin-auth-guard.service';
import { MonsterFormComponent } from './components/monster-form/monster-form.component';
import { ManageUndeadComponent } from './components/manage-undead/manage-undead.component';
import { AuthGuard } from 'shared/services/auth-guard.service';
import { EditWeaponsComponent } from './components/edit-weapons/edit-weapons.component';
import { WeaponFormComponent } from './components/weapon-form/weapon-form.component';
import { SpellFormComponent } from './components/spell-form/spell-form.component';
import { ManageSpellsComponent } from './components/manage-spells/manage-spells.component';
import { UndeadFormComponent } from './components/undead-form/undead-form.component';
import { EditUndeadComponent } from 'app/creator/components/edit-undead/edit-undead.component';
import { ManageClassesComponent } from './components/manage-classes/manage-classes.component';
import { ClassFormComponent } from './components/class-form/class-form.component';


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
      path: 'admin/undead/:id',
      component: EditUndeadComponent,
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
    },
    {
      path: 'admin/spells/new',
      component: SpellFormComponent,
      canActivate: [AuthGuard, AdminAuthGuard]
    },
    {
      path: 'admin/spells/:id',
      component: SpellFormComponent,
      canActivate: [AuthGuard, AdminAuthGuard]
    },
    {
      path: 'admin/spells',
      component: ManageSpellsComponent,
      canActivate: [AuthGuard, AdminAuthGuard]
    },
    {
      path: 'admin/classes/new',
      component: ClassFormComponent,
      canActivate: [AuthGuard, AdminAuthGuard]
    },
    {
      path: 'admin/classes/:id',
      component: ClassFormComponent,
      canActivate: [AuthGuard, AdminAuthGuard]
    },
    {
      path: 'admin/classes',
      component: ManageClassesComponent,
      canActivate: [AuthGuard, AdminAuthGuard]
    },
    ])
  ],
  declarations: [
    ManageMonstersComponent,
    ManageUndeadComponent,
    MonsterFormComponent,
    EditWeaponsComponent,
    WeaponFormComponent,
    SpellFormComponent,
    ManageSpellsComponent,
    UndeadFormComponent,
    ManageClassesComponent,
    ClassFormComponent,
  ],
  providers: [
    AdminAuthGuard
  ]
})
export class AdminModule { }
