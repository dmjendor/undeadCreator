import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageUndeadComponent } from './manage-undead.component';

describe('ManageUndeadComponent', () => {
  let component: ManageUndeadComponent;
  let fixture: ComponentFixture<ManageUndeadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageUndeadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageUndeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
