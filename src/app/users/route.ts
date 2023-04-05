import { removeUser } from "@/utils/dbCalls";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { user, password }: { user: string; password: string } =
      await request.json();

    const data = await removeUser(user, password);

    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json(e);
  }
}
