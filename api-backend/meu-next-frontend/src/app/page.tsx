// Caminho do Arquivo: app/page.tsx

import { redirect } from 'next/navigation';

/**
 * Esta é a página raiz da aplicação.
 * Sua única responsabilidade é redirecionar o usuário para a página de login,
 * que é o ponto de entrada da nossa aplicação.
 * Esta é uma prática comum em dashboards e aplicações que exigem autenticação.
 */
export default function HomePage() {
  redirect('/login');
}