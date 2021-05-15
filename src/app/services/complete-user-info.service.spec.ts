import { TestBed } from '@angular/core/testing';

import { CompleteUserInfoService } from './complete-user-info.service';

describe('CompleteUserInfoService', () => {
  let service: CompleteUserInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompleteUserInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
