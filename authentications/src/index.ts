import { app } from './utils/app';
import config from 'config';

const PORT = config.get<number>('port');
const HOST = config.get<string>('host');

app.listen(PORT, async () => {
  console.log(
    `Authentication server is listening on port http://${HOST}:${PORT}`
  );
});
