import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MonsterCardComponent } from './components/monster-card/monster-card.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MonsterService } from './services/monster.service';
import { AuthGuard } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { OptionQuantityComponent } from './components/option-quantity/option-quantity.component';
import { FiltersService } from './services/filters.service';
import { SpellQuantityComponent } from './components/spell-quantity/spell-quantity.component';
import { UndeadCardComponent } from './components/undead-card/undead-card.component';
import { WeaponService } from './services/weapons.service';
import { WeaponCardComponent } from './components/weapon-card/weapon-card.component';
import { SkillEditComponent } from './components/skill-edit/skill-edit.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CustomFormsModule,
    NgxDatatableModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule.forRoot()
  ],
  declarations: [
    MonsterCardComponent,
    OptionQuantityComponent,
    SpellQuantityComponent,
    UndeadCardComponent,
    WeaponCardComponent,
    SkillEditComponent
  ],
  exports: [
    MonsterCardComponent,
    UndeadCardComponent,
    WeaponCardComponent,
    SkillEditComponent,
    OptionQuantityComponent,
    SpellQuantityComponent,
    CommonModule,
    FormsModule,
    CustomFormsModule,
    NgxDatatableModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule.forRoot().ngModule
  ],
  providers: [
    WeaponService,
    MonsterService,
    FiltersService,
    UserService,
    AuthService,
    AuthGuard
  ]
})
export class SharedModule { }
