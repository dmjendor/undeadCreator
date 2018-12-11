import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUndeadComponent } from './edit-undead.component';

describe('EditUndeadComponent', () => {
  let component: EditUndeadComponent;
  let fixture: ComponentFixture<EditUndeadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditUndeadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUndeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
