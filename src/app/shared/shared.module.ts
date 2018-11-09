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
    OptionQuantityComponent
  ],
  exports: [
    MonsterCardComponent,
    OptionQuantityComponent,
    CommonModule,
    FormsModule,
    CustomFormsModule,
    NgxDatatableModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule.forRoot().ngModule
  ],
  providers: [
    MonsterService,
    FiltersService,
    UserService,
    AuthService,
    AuthGuard
  ]
})
export class SharedModule { }
