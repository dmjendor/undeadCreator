import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserUndeadComponent } from './user-undead.component';

describe('UserUndeadComponent', () => {
  let component: UserUndeadComponent;
  let fixture: ComponentFixture<UserUndeadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserUndeadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserUndeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
