import { TestBed } from '@angular/core/testing';

import { OlimpiadaService } from './olimpiada.service';

describe('OlimpiadaService', () => {
  let service: OlimpiadaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OlimpiadaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
