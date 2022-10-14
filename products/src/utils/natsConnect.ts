import { UsercreatedListener } from './../listener/user-ceated.listener';
import { SessionCreatedListener } from '../listener/session-created.listener';
import natsWrapper from './natsWrapper';

export const natsConnect = async () => {
  try {
    if (!process.env.NATS_CLUSTER_ID) {
      throw new Error('NATS_CLUSTER_ID must be defined');
    }
    if (!process.env.NATS_CLIENT_ID) {
      throw new Error('NATS_CLIENT_ID must be defined');
    }
    if (!process.env.NATS_URL) {
      throw new Error('NATS_URL must be defined');
    }
    try {
      await natsWrapper.connect(
        process.env.NATS_CLUSTER_ID,
        process.env.NATS_CLIENT_ID,
        process.env.NATS_URL
      );
    } catch (err) {
      console.log(err);
    }

    new SessionCreatedListener(natsWrapper.client).listen();
    new UsercreatedListener(natsWrapper.client).listen();

    natsWrapper.client.on('close', () => {
      console.log('Nats connection closed');
      process.exit();
    });

    process.on('SIGINT', () => natsWrapper.client.close());
    process.on('SIGTERM', () => natsWrapper.client.close());
  } catch (err) {
    console.log(err);
  }
};
