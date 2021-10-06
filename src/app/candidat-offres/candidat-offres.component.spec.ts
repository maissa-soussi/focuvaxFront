import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatOffresComponent } from './candidat-offres.component';

describe('CandidatOffresComponent', () => {
  let component: CandidatOffresComponent;
  let fixture: ComponentFixture<CandidatOffresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidatOffresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidatOffresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
