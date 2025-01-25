/**@type {import("drizzle-kit").Config} */
export default {
    schema: "./configs/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
        url: 'postgresql://neondb_owner:10BgQlbKsztJ@ep-divine-shape-a8rntcye-pooler.eastus2.azure.neon.tech/video-ai-generator?sslmode=require'
    }
};