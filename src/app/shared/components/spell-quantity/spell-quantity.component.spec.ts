import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpellQuantityComponent } from './spell-quantity.component';

describe('SpellQuantityComponent', () => {
  let component: SpellQuantityComponent;
  let fixture: ComponentFixture<SpellQuantityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpellQuantityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpellQuantityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
