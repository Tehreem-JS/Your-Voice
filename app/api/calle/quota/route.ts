import { NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/getUserId";
import { callQuota } from "@/lib/ratelimit";

export async function GET() {
  const userId = await getUserId();
  if (!userId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const quota = await callQuota.getRemaining(userId);

  return NextResponse.json({
    remaining: quota.remaining,
    limit: quota.limit,
    resetAt: quota.reset,
  });
}