import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Recipe entity representing a recipe in the database
 */
@Entity('recipes')
export class Recipe {
  @ApiProperty({
    description: 'Recipe ID',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Recipe title',
    example: 'Chicken Curry',
  })
  @Column({
    type: 'varchar',
    length: 100,
    charset: 'utf8',
    collation: 'utf8_unicode_ci',
  })
  title: string;

  @ApiProperty({
    description: 'Time required to make the recipe',
    example: '45 min',
  })
  @Column({
    type: 'varchar',
    length: 100,
    charset: 'utf8',
    collation: 'utf8_unicode_ci',
  })
  making_time: string;

  @ApiProperty({
    description: 'Number of people the recipe serves',
    example: '4 people',
  })
  @Column({
    type: 'varchar',
    length: 100,
    charset: 'utf8',
    collation: 'utf8_unicode_ci',
  })
  serves: string;

  @ApiProperty({
    description: 'List of ingredients',
    example: 'onion, chicken, seasoning',
  })
  @Column({
    type: 'varchar',
    length: 300,
    charset: 'utf8',
    collation: 'utf8_unicode_ci',
  })
  ingredients: string;

  @ApiProperty({
    description: 'Cost of the recipe',
    example: 1000,
  })
  @Column({ type: 'int' })
  cost: number;

  @ApiProperty({
    description: 'Recipe creation date',
    example: '2016-01-11T13:30:13.000Z',
  })
  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;

  @ApiProperty({
    description: 'Recipe last update date',
    example: '2016-01-11T13:30:13.000Z',
  })
  @UpdateDateColumn({ type: 'datetime' })
  updated_at: Date;
}
