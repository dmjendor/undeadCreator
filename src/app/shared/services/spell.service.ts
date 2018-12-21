import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Spell } from 'shared/models/spell';

@Injectable({
  providedIn: 'root'
})
export class SpellService {
  spells$: Observable<any[]>;

  constructor(private db: AngularFireDatabase) {
    this.spells$ = this.db.list('/spells', c => c.orderByChild('index'))
    .snapshotChanges();
   }

  create(spell) {
    return this.db.list('/spells').push(spell);
  }

  update(spellId, spell) {
    return this.db.object('/spells/' + spellId).update(spell);
  }

  remove(spellId) {
    return this.db.object('/spells/' + spellId).remove();
  }

  getAll() {
    return this.spells$.pipe(map(changes => {
      return changes.map(p => ({ key: p.payload.key, ...p.payload.val() }));
    }));
  }

  get(spellId) {
    return this.db.object('/spells/' + spellId);
  }

  getUndeadSpells() {
    return this.db.list('/spells',
      ref => ref.orderByChild('points')
      .startAt(0.5))
      .snapshotChanges()
      .pipe(map(items => {            // <== new way of chaining
        return items.map(a => {
          const data = a.payload.val() as Spell;
          const key = a.payload.key;
          data.key  = key;
          return data;
        });
      }));
  }
}
