import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';

@Module({
  controllers: [MoviesController],
  providers: [MoviesService], // Dependency Injection -> NestJS가 알아서 Import 해줌
})
export class MoviesModule {}
