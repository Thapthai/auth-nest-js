import { Test, TestingModule } from '@nestjs/testing';
import { NewLinenDetailsController } from './new_linen_details.controller';
import { NewLinenDetailsService } from './new_linen_details.service';

describe('NewLinenDetailsController', () => {
  let controller: NewLinenDetailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NewLinenDetailsController],
      providers: [NewLinenDetailsService],
    }).compile();

    controller = module.get<NewLinenDetailsController>(NewLinenDetailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
