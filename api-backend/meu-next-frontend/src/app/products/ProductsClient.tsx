'use client';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

// A interface do produto
interface Product {
  id: number;
  name: string;
  price: number;
  user?: { email: string };
}

export function ProductsClient({ initialProducts }: { initialProducts: Product[] }) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const { logout } = useAuth();

  // Funções para criar e deletar que rodam no cliente
  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = document.cookie.split('; ').find(row => row.startsWith('authToken='))?.split('=')[1];
    const response = await axios.post(
      'http://localhost:3001/products',
      { name, price: parseFloat(price) },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setProducts([...products, response.data]);
    setName('');
    setPrice('');
  };

  const handleDeleteProduct = async (id: number) => {
    const token = document.cookie.split('; ').find(row => row.startsWith('authToken='))?.split('=')[1];
    await axios.delete(`http://localhost:3001/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setProducts(products.filter(p => p.id !== id));
  };
  
  return (
    <div>
      <button onClick={logout}>Sair</button>
      <h2>Meus Produtos</h2>
      <form onSubmit={handleCreateProduct}>
        <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Nome" />
        <input type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder="Preço" />
        <button type="submit">Criar</button>
      </form>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.name} - {product.price} (Criado por: {product.user?.email})
            <button onClick={() => handleDeleteProduct(product.id)}>Deletar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}