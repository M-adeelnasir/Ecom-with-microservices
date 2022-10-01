import { app } from './utils/app';
import config from 'config';
import { log } from './utils/logger';
import swaggerDocs from './utils/swagger';
import connectDb from './utils/mongoDb';

const PORT = config.get<number>('port');
const HOST = config.get<string>('host');

const server = app.listen(PORT, async () => {
  await connectDb();
  log.info(`Authentication server is listening on port http://${HOST}:${PORT}`);
  swaggerDocs(app, PORT);
});

process.on('unhandledRejection', (err: Error) => {
  console.log('SERVER ERROR ===>' + err);
  server.close(process.exit(1));
});
