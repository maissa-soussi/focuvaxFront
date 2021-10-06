import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccueilNavbarComponent } from './accueil-navbar.component';

describe('AccueilNavbarComponent', () => {
  let component: AccueilNavbarComponent;
  let fixture: ComponentFixture<AccueilNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccueilNavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccueilNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
