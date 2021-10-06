import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatLoginComponent } from './candidat-login.component';

describe('CandidatLoginComponent', () => {
  let component: CandidatLoginComponent;
  let fixture: ComponentFixture<CandidatLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidatLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidatLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
