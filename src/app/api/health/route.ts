import { NextResponse } from "next/server";
import { execFile } from "child_process";

function checkYtDlp(): Promise<{ installed: boolean; version: string | null }> {
  return new Promise((resolve) => {
    execFile("yt-dlp", ["--version"], (error, stdout) => {
      if (error) {
        resolve({ installed: false, version: null });
      } else {
        resolve({ installed: true, version: stdout.trim() });
      }
    });
  });
}

export async function GET() {
  const ytdlp = await checkYtDlp();
  return NextResponse.json({
    status: "ok",
    version: "1.0.0-beta",
    ytdlp,
    timestamp: new Date().toISOString(),
  });
}
