import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteUserInfoComponent } from './complete-user-info.component';

describe('CompleteUserInfoComponent', () => {
  let component: CompleteUserInfoComponent;
  let fixture: ComponentFixture<CompleteUserInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompleteUserInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompleteUserInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
