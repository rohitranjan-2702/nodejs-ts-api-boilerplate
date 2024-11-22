import { z } from "zod";

const EnvSchema = z.object({
  PORT: z
    .string({
      required_error: "PORT is needed.",
    })
    .transform((val) => parseInt(val, 10)),
  HOSTNAME: z.string({
    required_error: "HOSTNAME is needed.",
  }),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  POSTGRES_USER: z.string({
    required_error: "POSTGRES_USER is needed.",
  }),
  POSTGRES_PASSWORD: z.string({
    required_error: "POSTGRES_PASSWORD is needed.",
  }),
  POSTGRES_PORT: z
    .string({
      required_error: "POSTGRES_PORT is needed.",
    })
    .transform((val) => parseInt(val, 10)),
  POSTGRES_DATABASE: z.string({
    required_error: "POSTGRES_DATABASE is needed.",
  }),
  POSTGRES_HOST: z.string({
    required_error: "POSTGRES_HOST is needed.",
  }),
});

const rawEnv = {
  PORT: process.env.PORT,
  HOSTNAME: process.env.HOSTNAME,
  NODE_ENV: process.env.NODE_ENV,
  POSTGRES_USER: process.env.POSTGRES_USER,
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
  POSTGRES_PORT: process.env.POSTGRES_PORT,
  POSTGRES_DATABASE: process.env.POSTGRES_DATABASE,
  POSTGRES_HOST: process.env.POSTGRES_HOST,
  MONGO_URI: process.env.MONGO_URI,
};

const parsedEnv = EnvSchema.safeParse(rawEnv);

if (!parsedEnv.success) {
  console.error("Invalid environment variables:");
  console.error(parsedEnv.error.errors.map((e) => e.message).join("\n"));
  process.exit(1);
}

export const env = parsedEnv.data;
