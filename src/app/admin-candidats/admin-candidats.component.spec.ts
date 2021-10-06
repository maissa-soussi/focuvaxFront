import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCandidatsComponent } from './admin-candidats.component';

describe('AdminCandidatsComponent', () => {
  let component: AdminCandidatsComponent;
  let fixture: ComponentFixture<AdminCandidatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCandidatsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCandidatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
