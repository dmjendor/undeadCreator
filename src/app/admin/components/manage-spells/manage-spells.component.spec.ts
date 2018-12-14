import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSpellsComponent } from './manage-spells.component';

describe('ManageSpellsComponent', () => {
  let component: ManageSpellsComponent;
  let fixture: ComponentFixture<ManageSpellsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageSpellsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageSpellsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
