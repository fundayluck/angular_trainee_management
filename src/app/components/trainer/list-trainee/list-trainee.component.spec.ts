import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTraineeComponent } from './list-trainee.component';

describe('ListTraineeComponent', () => {
  let component: ListTraineeComponent;
  let fixture: ComponentFixture<ListTraineeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListTraineeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListTraineeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
