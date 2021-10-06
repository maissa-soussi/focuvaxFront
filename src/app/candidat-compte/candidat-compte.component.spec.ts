import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatCompteComponent } from './candidat-compte.component';

describe('CandidatCompteComponent', () => {
  let component: CandidatCompteComponent;
  let fixture: ComponentFixture<CandidatCompteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidatCompteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidatCompteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
