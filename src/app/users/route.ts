import { upsertLinks } from "@/utils/dbCalls";
import supabase from "@/utils/supabase";
import { Link } from "@/utils/types";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const {
      user,
      links,
      password,
    }: { user: string; links: Link[]; password: string } = await request.json();

    const data = await upsertLinks(user, password, links);

    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json(e);
  }
}
