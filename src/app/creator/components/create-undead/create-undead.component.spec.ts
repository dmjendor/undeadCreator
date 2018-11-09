import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUndeadComponent } from './create-undead.component';

describe('CreateMonsterComponent', () => {
  let component: CreateUndeadComponent;
  let fixture: ComponentFixture<CreateUndeadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateUndeadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUndeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
