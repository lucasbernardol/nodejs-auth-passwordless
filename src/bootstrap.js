import { createServer } from 'node:http';

import { app } from './app.js';

function createApplicationServer(app) {
  const server = createServer(app);

  return new Promise((resolve, _reject) => {
    server.listen(process.env.PORT, () => {
      console.log(`HOST: ${process.env.HOST}\nPORT: ${process.env.PORT}`);

      return resolve();
    });
  });
}

export async function bootstrap() {
  // await db connection

  await createApplicationServer(app);
}
