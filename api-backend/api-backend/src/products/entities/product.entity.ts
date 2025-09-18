// src/products/entities/product.entity.ts
import { UserEntity } from 'src/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'products' }) // Mapeia para uma tabela chamada 'products'
export class ProductEntity {
  @PrimaryGeneratedColumn() // Define como chave primária com auto-incremento
  id: number;

  @Column({ length: 100 }) // Define uma coluna do tipo string (varchar)
  name: string;

  @Column('decimal', { precision: 10, scale: 2 }) // Define uma coluna decimal para preços
  price: number;

  @CreateDateColumn({ name: 'created_at' }) // Coluna que armazena a data de criação
  createdAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.products)
  user: UserEntity
}