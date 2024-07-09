import { IsNumber, IsString } from 'class-validator';

// Version 1 : 선택적 인자 전달
export class UpdateMovieDTO {
  @IsString()
  readonly title?: string;
  @IsNumber()
  readonly year?: number;
  @IsString({ each: true })
  readonly genres?: string[];
  @IsString()
  readonly director?: string;
}

// Version 2 : Partial Type
// export class UpdateMovieDTO extends Partial {}
