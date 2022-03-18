import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: `nestjs-prac`,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true, // true : 엔티티안에서 수정된 컬러의 길이,타입, 변경값등을 해당 테이블 Drop후 재생성
};
