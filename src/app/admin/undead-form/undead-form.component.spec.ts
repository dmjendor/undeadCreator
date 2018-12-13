import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UndeadFormComponent } from './undead-form.component';

describe('UndeadFormComponent', () => {
  let component: UndeadFormComponent;
  let fixture: ComponentFixture<UndeadFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UndeadFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UndeadFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
