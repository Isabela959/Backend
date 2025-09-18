// app/api/auth/login/route.ts
import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password } = body;

  try {
    // 1. Chama a API NestJS para validar o login
    const response = await axios.post("http://localhost:3001/auth/login", {
      email,
      password,
    });

    const { access_token } = response.data;

    if (!access_token) {
      return NextResponse.json(
        { message: "Token não encontrado" },
        { status: 401 }
      );
    }

    // 2. Cria uma resposta e define o token em um cookie httpOnly
    const nextResponse = NextResponse.json({ message: "Login bem-sucedido" });
    nextResponse.cookies.set("authToken", access_token, {
      httpOnly: true, // O cookie não é acessível via JavaScript do cliente
      secure: process.env.NODE_ENV !== "development", // Em produção, usar HTTPS
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60, // 1 hora
    });

    return nextResponse;
  } catch (error: any) {
    return NextResponse.json(
      { message: error.response?.data?.message || "Erro interno do servidor" },
      { status: error.response?.status || 500 }
    );
  }
}
