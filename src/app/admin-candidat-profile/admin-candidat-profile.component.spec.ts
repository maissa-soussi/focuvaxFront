import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCandidatProfileComponent } from './admin-candidat-profile.component';

describe('AdminCandidatProfileComponent', () => {
  let component: AdminCandidatProfileComponent;
  let fixture: ComponentFixture<AdminCandidatProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCandidatProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCandidatProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
