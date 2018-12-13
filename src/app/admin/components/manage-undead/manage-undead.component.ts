import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable, Subscription } from 'rxjs';
import { Undead } from 'shared/models/undead';
import { UndeadService } from 'shared/services/undead.service';
import { Router } from '@angular/router';
import { UserService } from 'shared/services/user.service';
import { AppUser } from 'shared/models/app-user';



@Component({
  selector: 'manage-undead',
  templateUrl: './manage-undead.component.html',
  styleUrls: ['./manage-undead.component.css']
})
export class ManageUndeadComponent implements OnInit, OnDestroy {
    undead: Undead[];
    undeadSub: Subscription;
    users: AppUser[];
    userSub: Subscription;

    selected: any[];
    selectedUndead: Undead;
    columns = [
      { prop: 'name' },
      { name: 'Cost' },
      { user: 'User' }
    ];

    constructor(
      private userService: UserService,
      private undeadService: UndeadService,
      private router: Router
      ) {
        this.userSub = this.userService.getAll()
          .subscribe(users => this.users = users);
      }

    createUndead() {
      this.router.navigate(['/admin/undead/new']);
    }

    editUndead() {
      this.router.navigate(['/admin/undead/' + this.selectedUndead.key]);
    }

    deleteUndead() {
      this.undeadService.remove(this.selectedUndead.key);
    }

    onSelect({ selected }) {
      this.selectedUndead = this.selected[0];
    }

    onActivate(event) {
      // console.log('Activate Event', event);
    }

    filter(query: string) {
       const filteredProducts = (query) ?
        this.undead.filter(p => p.name.toLowerCase().includes(query.toLowerCase())) :
        this.undead;
      // this.initializeTable(filteredProducts);

    }

    reloadItems(params) {

    }

    async ngOnInit() {

      this.undeadSub = this.undeadService.getAll()
      .subscribe(undead => {
        this.undead = undead as Undead[];
        console.log(this.users);
        for (let i = 0; i < this.undead.length; i++) {
          const u = this.users.find(x => x.key === this.undead[i].user);
          this.undead[i].user = u.name;
        }
        this.selected = [this.undead[0]];
        this.selectedUndead = this.undead[0];
      });
    }

    ngOnDestroy() {
      this.undeadSub.unsubscribe();
      this.userSub.unsubscribe();
    }

  }

