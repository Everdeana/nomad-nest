import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
  Body,
  Query,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';
import { CreateMovieDTO } from './dto/create-movie.dto';
import { UpdateMovieDTO } from './dto/update-movie.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

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
