const { spawn } = require("child_process");
const path = require("path");
const fs = require("fs");

const YTDLP_PATH = "C:\\Users\\goura\\AppData\\Local\\Microsoft\\WinGet\\Packages\\yt-dlp.yt-dlp_Microsoft.Winget.Source_8wekyb3d8bbwe\\yt-dlp.exe";
const FFMPEG_PATH = "C:\\Users\\goura\\AppData\\Local\\Microsoft\\WinGet\\Packages\\yt-dlp.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\\ffmpeg-N-123074-g4e32fb4c2a-win64-gpl\\bin\\ffmpeg.exe";

const url = "https://www.youtube.com/watch?v=aqz-KE-bpKQ";
const format = "bestvideo[height<=1080]+bestaudio/best[height<=1080]";
const outputPath = path.join(__dirname, "test_output.%(ext)s");

const args = [
  "--no-warnings",
  "--no-playlist",
  "--ffmpeg-location", FFMPEG_PATH,
  "-f", format,
  "-o", outputPath,
  "--user-agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
  "--no-check-certificates",
  url
];

console.log("Running yt-dlp...");
const proc = spawn(YTDLP_PATH, args);

proc.stdout.on("data", (d) => console.log(`STDOUT: ${d}`));
proc.stderr.on("data", (d) => console.log(`STDERR: ${d}`));

proc.on("close", (code) => {
  console.log(`Process exited with code ${code}`);
});
