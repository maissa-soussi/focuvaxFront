import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOffresComponent } from './admin-offres.component';

describe('AdminOffresComponent', () => {
  let component: AdminOffresComponent;
  let fixture: ComponentFixture<AdminOffresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminOffresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOffresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
