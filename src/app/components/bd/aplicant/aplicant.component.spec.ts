import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AplicantComponent } from './aplicant.component';

describe('AplicantComponent', () => {
  let component: AplicantComponent;
  let fixture: ComponentFixture<AplicantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AplicantComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AplicantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
