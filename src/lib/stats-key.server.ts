import { createHash, timingSafeEqual } from "node:crypto";

// Hash SHA-256 de la clave del link privado de estadísticas. La clave no se guarda en el repo.
const STATS_KEY_SHA256 = "ada7b96046d37ba7da0924a2e88f3edf2ac5965d4eb347b0566c9fce2701cb50";

export function isValidStatsKey(key: string | null): boolean {
  if (!key || key.length > 200) return false;
  const got = createHash("sha256").update(key).digest();
  const want = Buffer.from(STATS_KEY_SHA256, "hex");
  return got.length === want.length && timingSafeEqual(got, want);
}
