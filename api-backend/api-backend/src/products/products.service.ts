// src/products/products.service.ts
import { Injectable, NotFoundException } from '@nestjs/common'; // Importe NotFoundException

interface Product {
  id: number;
  name: string;
  price: number;
}

@Injectable()
export class ProductsService {
  // Remova 'readonly' se você pretende reatribuir o array (como em 'remove')
  // Se você *precisa* de 'readonly' aqui, então o método 'remove' precisaria usar splice.
  private products: Product[] = []; // Array em memória para simular o DB
  private nextId = 1; // Começaremos IDs do 1

  // Para demonstração, vamos adicionar alguns produtos iniciais
  constructor() {
    this.create({ name: 'Fone de Ouvido', price: 99.99 });
    this.create({ name: 'Teclado Mecânico', price: 150.0 });
    this.create({ name: 'Mouse Gamer', price: 75.5 });
  }

  findAll(): Product[] {
    return this.products; // Retorna o array de produtos
  }

  // Corrigido: Retorna Product | undefined, pois o produto pode não ser encontrado
  findOne(id: number): Product | undefined {
    return this.products.find((product) => product.id === id);
  }

  // Alternativa para findOne: Lança um erro se o produto não for encontrado
  findOneOrThrow(id: number): Product {
    const product = this.products.find((p) => p.id === id);
    if (!product) {
      throw new NotFoundException(`Produto com ID ${id} não encontrado.`);
    }
    return product;
  }

  create(product: { name: string; price: number }): Product {
    const newProduct = { id: this.nextId++, ...product };
    this.products.push(newProduct);
    return newProduct;
  }

  // Corrigido: Retorna Product | undefined, pois o produto pode não ser encontrado
  update(
    id: number,
    product: { name?: string; price?: number },
  ): Product | undefined {
    const index = this.products.findIndex((p) => p.id === id);
    if (index > -1) {
      this.products[index] = { ...this.products[index], ...product };
      return this.products[index];
    }
    return undefined; // Retorna undefined se não encontrou (ou lance um erro)
  }

  // Alternativa para update: Lança um erro se o produto não for encontrado
  updateOrThrow(
    id: number,
    product: { name?: string; price?: number },
  ): Product {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new NotFoundException(
        `Produto com ID ${id} não encontrado para atualização.`,
      );
    }
    this.products[index] = { ...this.products[index], ...product };
    return this.products[index];
  }

  // Corrigido: 'products' não pode ser 'readonly' se você for reatribuí-lo
  remove(id: number): boolean {
    const initialLength = this.products.length;
    this.products = this.products.filter((p) => p.id !== id); // Reatribuição do array
    return this.products.length < initialLength; // Retorna true se um produto foi removido
  }

  // Alternativa para remove: Lança um erro se o produto não for encontrado
  removeOrThrow(id: number): void {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new NotFoundException(
        `Produto com ID ${id} não encontrado para remoção.`,
      );
    }
    this.products.splice(index, 1); // Remove no local
  }
}
