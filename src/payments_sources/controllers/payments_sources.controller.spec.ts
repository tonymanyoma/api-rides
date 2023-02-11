import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsSourcesController } from './payments_sources.controller';

describe('PaymentsSourcesController', () => {
  let controller: PaymentsSourcesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentsSourcesController],
    }).compile();

    controller = module.get<PaymentsSourcesController>(PaymentsSourcesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
