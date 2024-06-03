import { createServer } from 'node:http';

import { app } from './app.js';
import { MongoDatabaseDriver } from './modules/drivers/MongoDatabaseDriver.js';

function createApplicationServer(app) {
  const server = createServer(app);

  return new Promise((resolve, _reject) => {
    server.listen(process.env.PORT, () => {
      console.log(`\n\nHOST: ${process.env.HOST}\nPORT: ${process.env.PORT}`);

      return resolve();
    });
  });
}

export async function bootstrap() {
  await new MongoDatabaseDriver().connect();

  await createApplicationServer(app);
}
