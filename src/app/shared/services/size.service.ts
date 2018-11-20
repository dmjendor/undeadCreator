import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SizeService {
  sizes$: Observable<any[]>;

  constructor(private db: AngularFireDatabase) {
    this.sizes$ = this.db.list('/sizes', c => c.orderByChild('index'))
    .snapshotChanges();
   }

  create(size) {
    return this.db.list('/sizes').push(size);
  }

  update(sizeId, size) {
    return this.db.object('/sizes/' + sizeId).update(size);
  }

  remove(sizeId) {
    return this.db.object('/sizes/' + sizeId).remove();
  }

  getAll() {
    return this.sizes$.pipe(map(changes => {
      return changes.map(p => ({ key: p.payload.key, ...p.payload.val() }));
    }));
  }

  get(sizeId) {
    return this.db.object('/sizes/' + sizeId);
  }
}
