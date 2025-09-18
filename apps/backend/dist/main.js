"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: ['http://localhost:3000', 'https://frontend-bgqgxhnjy-tjs-projects-e59fb6d9.vercel.app'],
        credentials: true,
    });
    const port = process.env.PORT || 3001;
    await app.listen(port);
    console.log(`🚀 Backend running on port ${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map