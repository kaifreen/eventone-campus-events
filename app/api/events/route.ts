import { NextResponse } from "next/server";
import { getEventData } from "@/lib/events";

export const dynamic = "force-dynamic";

export async function GET() {
  const data = await getEventData();
  return NextResponse.json(data);
}
