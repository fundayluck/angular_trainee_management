import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { bdGuard } from './bd.guard';

describe('bdGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => bdGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
