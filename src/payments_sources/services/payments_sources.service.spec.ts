import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsSourcesService } from './payments_sources.service';

describe('PaymentsSourcesService', () => {
  let service: PaymentsSourcesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentsSourcesService],
    }).compile();

    service = module.get<PaymentsSourcesService>(PaymentsSourcesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
