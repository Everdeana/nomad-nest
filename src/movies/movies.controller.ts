import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
  Body,
  Query,
} from '@nestjs/common'; // Res, Req를 사용한다면 위의 import 안에 추가
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';
import { CreateMovieDTO } from './dto/create-movie.dto';
import { UpdateMovieDTO } from './dto/update-movie.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  // NestJS는 Express 위에서 돌아감
  // Controller에서 Request, Response 객체가 필요하면 사용할 수 있음
  // 아래와 같이 @Req, @Res로 사용하는건 좋은 방법은 아님
  // @Get()
  // getAll(@Req() req, @Res() res): Movie[] {
  //   res.json();
  //   return this.moviesService.getAll();
  // }
  // Express에서 Fastify로 번환시킬 수 있기 때문(2개의 프레임워크랑 작동)

  @Get()
  getAll(): Movie[] {
    return this.moviesService.getAll();
  }

  @Get('search') // @Get(':id') 보다 밑에 있으면 NestJS는 search를 id로 판단함
  search(@Query('year') searchingYear: string) {
    return `We Are Searching For A Movie Made After : ${searchingYear}`;
  }

  @Get(':id')
  getOne(@Param('id') movieID: number): Movie {
    console.log(`Type Of ID: ${typeof movieID}`);
    // id Parameter를 가쟈와서 String 형식으로 MovieID에 저장한 뒤 출력
    return this.moviesService.getOne(movieID);
  }

  @Post()
  create(@Body() movieData: CreateMovieDTO) {
    // console.log(movieData);
    // return `This Will Create a Movie : ${JSON.stringify(movieData)}`;
    // return `This Will Create a Movie : ${JSON.stringify(movieData, null, 2)}`;
    return this.moviesService.create(movieData);
  }

  @Delete(':id')
  remove(@Param('id') movieID: number) {
    return this.moviesService.deleteOne(movieID);
  }

  // @Put() // 모든 리소스 업데이트
  // @Patch() // 리소스의 일부분 업데이트
  @Patch(':id')
  patch(@Param('id') movieID: number, @Body() updateData: UpdateMovieDTO) {
    // return `This Will Patch a Movie With The ID: ${movieID}`;
    // return {
    //   updatedMovie: movieID,
    //   ...updateData,
    // };
    return this.moviesService.update(movieID, updateData);
  }
}
