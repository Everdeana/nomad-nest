import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { MoviesController } from './movies/movies.controller';
// import { MoviesService } from './movies/movies.service';
import { MoviesModule } from './movies/movies.module';

@Module({
  imports: [MoviesModule],
  // controllers: [AppController, MoviesController],
  // providers: [AppService, MoviesService],
  // app.module은 AppController, AppService만 가지고 있어야 한다.
  // NestJS는 여러 개의 모듈리 이루어지기 때문에
  // movies.module에 MoviesController, MoviesService가 있어야 한다.
  controllers: [AppController],
  // providers: [AppService],
  providers: [],
})
export class AppModule {}
