import { updateLinksList } from "@/utils/dbCalls";
import { Link } from "@/utils/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const {
      user,
      password,
      dbLinks,
      links,
    }: { user: string; password: string; dbLinks: Link[]; links: Link[] } =
      await request.json();

    const data = await updateLinksList(user, password, dbLinks, links);

    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json(e);
  }
}
