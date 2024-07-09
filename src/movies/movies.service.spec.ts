import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { NotFoundException } from '@nestjs/common';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // it('should be 5', () => {});
  // expect(2 + 3).toEqual(5); // 2+2 = 4 -> expect

  describe('getAll', () => {
    it('should return an array', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOne', () => {
    it('should return a movie', () => {
      service.create({
        title: 'testTitle',
        genres: ['testGenre'],
        year: 2000,
        director: 'testDirector',
      });
      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });
    it('should throw 404 error', () => {
      try {
        service.getOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual('Movie With ID 999 Not Found.');
      }
    });
  });

  describe('deleteOne', () => {
    it('deletes a movie', () => {
      service.create({
        title: 'testTitle',
        genres: ['testGenre'],
        year: 2000,
        director: 'testDirector',
      });
      console.log(service.getAll());
      const beforeDelete = service.getAll().length;
      service.deleteOne(1);
      const afterDelete = service.getAll().length;
      // expect(afterDelete.length).toEqual(beforeDelete.length - 1);
      expect(afterDelete).toBeLessThan(beforeDelete);
    });
    it('should return 404 error', () => {
      try {
        service.deleteOne(99);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual('Movie With ID 99 Not Found.');
      }
    });
  });

  describe('create', () => {
    it('should create a movie', () => {
      const beforeDelete = service.getAll().length;
      service.create({
        title: 'testTitle',
        genres: ['testGenre'],
        year: 2000,
        director: 'testDirector',
      });
      const afterDelete = service.getAll().length;
      console.log(beforeDelete, afterDelete);
      expect(afterDelete).toBeGreaterThan(beforeDelete);
    });
  });
});
