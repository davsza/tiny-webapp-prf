import { TestBed } from '@angular/core/testing';

import { TermekserviceService } from './termekservice.service';

describe('TermekserviceService', () => {
  let service: TermekserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TermekserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
