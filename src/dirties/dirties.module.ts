import { Module } from '@nestjs/common';
import { DirtiesService } from './dirties.service';
import { DirtiesController } from './dirties.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [DirtiesController],
  providers: [DirtiesService],
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ]
})
export class DirtiesModule { }
