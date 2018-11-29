import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WeaponService {
  weapons$: Observable<any[]>;

  constructor(private db: AngularFireDatabase) {
    this.weapons$ = this.db.list('/weapons', c => c.orderByChild('type'))
    .snapshotChanges();
   }

  create(weapon) {
    return this.db.list('/weapons').push(weapon);
  }

  update(weaponId, weapon) {
    return this.db.object('/weapons/' + weaponId).update(weapon);
  }

  remove(weaponId) {
    return this.db.object('/weapons/' + weaponId).remove();
  }

  getAll() {
    return this.weapons$.pipe(map(changes => {
      return changes.map(p => ({ key: p.payload.key, ...p.payload.val() }));
    }));
  }

  get(weaponId) {
    return this.db.object('/weapons/' + weaponId);
  }
}
