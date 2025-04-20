// src/config/env.ts
import { fileURLToPath } from "url";
import path from "path";
import dotenv from "dotenv";
import fs from "fs";

// recria __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const env = process.env.NODE_ENV || "development";
const envPath = path.resolve(__dirname, `../../src/infra/.env.${env}`);

if (!fs.existsSync(envPath)) {
  console.error(`❌ Arquivo .env não encontrado: ${envPath}`);
  process.exit(1);
}

dotenv.config({ path: envPath });

console.log(`✅ Ambiente carregado: ${env}`);
console.log(`📄 Usando env file: ${envPath}`);
console.log("🔧 TYPEORM_PASSWORD:", process.env.TYPEORM_PASSWORD);
console.log("🔧 TYPEORM_PORT:", process.env.TYPEORM_PORT);
