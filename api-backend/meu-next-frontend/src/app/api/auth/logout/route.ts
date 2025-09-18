// app/api/auth/logout/route.ts
import { NextResponse } from "next/server";

export async function POST() {
  // Cria uma resposta e "deleta" o cookie setando sua validade para o passado
  const response = NextResponse.json({ message: "Logout bem-sucedido" });
  response.cookies.set("authToken", "", {
    httpOnly: true,
    path: "/",
    expires: new Date(0),
  });
  return response;
}
