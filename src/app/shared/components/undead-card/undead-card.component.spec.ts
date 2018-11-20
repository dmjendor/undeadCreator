import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UndeadCardComponent } from './undead-card.component';

describe('UndeadCardComponent', () => {
  let component: UndeadCardComponent;
  let fixture: ComponentFixture<UndeadCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UndeadCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UndeadCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
