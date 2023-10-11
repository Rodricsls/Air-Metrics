import { TestBed } from '@angular/core/testing';

import { MymqttService } from './mymqtt.service';

describe('MymqttService', () => {
  let service: MymqttService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MymqttService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
