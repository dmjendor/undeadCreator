import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageMonstersComponent } from './manage-monsters.component';

describe('ManageMonstersComponent', () => {
  let component: ManageMonstersComponent;
  let fixture: ComponentFixture<ManageMonstersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageMonstersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageMonstersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
