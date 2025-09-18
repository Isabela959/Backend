// app/products/page.tsx
import { cookies } from 'next/headers';
import axios from 'axios';
import { ProductsClient } from './ProductsClient'; // Nosso futuro componente de cliente

// Função para buscar os produtos no servidor
async function getProducts(token: string) {
  try {
    const response = await axios.get('http://localhost:3001/products', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.data || []; // Retorna o array de produtos ou um array vazio
  } catch (error) {
    console.error('Falha ao buscar produtos no servidor:', error);
    return [];
  }
}

export default async function ProductsPage() {
  // 1. No servidor, lemos o cookie de autenticação
  const cookieStore = cookies();
  const authToken = cookieStore.get('authToken')?.value;

  // 2. Buscamos os dados iniciais dos produtos
  const initialProducts = authToken ? await getProducts(authToken) : [];

  // 3. Renderizamos o componente de cliente, passando os dados iniciais
  return <ProductsClient initialProducts={initialProducts} />;
}