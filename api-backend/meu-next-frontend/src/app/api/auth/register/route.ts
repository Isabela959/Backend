// app/api/auth/register/route.ts
import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: Request) {
  const body = await request.json();
  try {
    await axios.post("http://localhost:3001/users", body);
    return NextResponse.json(
      { message: "Usuário criado com sucesso" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: error.response?.data?.message || "Erro ao registrar" },
      { status: error.response?.status || 500 }
    );
  }
}
