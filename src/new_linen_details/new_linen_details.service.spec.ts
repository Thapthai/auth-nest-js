import { Test, TestingModule } from '@nestjs/testing';
import { NewLinenDetailsService } from './new_linen_details.service';

describe('NewLinenDetailsService', () => {
  let service: NewLinenDetailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NewLinenDetailsService],
    }).compile();

    service = module.get<NewLinenDetailsService>(NewLinenDetailsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
