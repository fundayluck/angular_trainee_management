import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBDComponent } from './create-bd.component';

describe('CreateBDComponent', () => {
  let component: CreateBDComponent;
  let fixture: ComponentFixture<CreateBDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateBDComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateBDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
