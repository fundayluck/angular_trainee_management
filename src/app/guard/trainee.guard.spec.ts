import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { traineeGuard } from './trainee.guard';

describe('traineeGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => traineeGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
