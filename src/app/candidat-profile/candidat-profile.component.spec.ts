import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatProfileComponent } from './candidat-profile.component';

describe('CandidatProfileComponent', () => {
  let component: CandidatProfileComponent;
  let fixture: ComponentFixture<CandidatProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidatProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidatProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
