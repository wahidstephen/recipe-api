import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

/**
 * Recipe entity representing a recipe in the database
 */
@Entity('recipes')
export class Recipe {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 100,
    charset: 'utf8',
    collation: 'utf8_unicode_ci',
  })
  title: string;

  @Column({
    type: 'varchar',
    length: 100,
    charset: 'utf8',
    collation: 'utf8_unicode_ci',
  })
  making_time: string;

  @Column({
    type: 'varchar',
    length: 100,
    charset: 'utf8',
    collation: 'utf8_unicode_ci',
  })
  serves: string;

  @Column({
    type: 'varchar',
    length: 300,
    charset: 'utf8',
    collation: 'utf8_unicode_ci',
  })
  ingredients: string;

  @Column({ type: 'int' })
  cost: number;

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updated_at: Date;
}
