import { Subject } from '../subjects';
import { Stan } from 'node-nats-streaming';

interface Event {
  subject: Subject;
  data: any;
}

export abstract class Publisher<T extends Event> {
  abstract subject: T['subject'];

  protected client: Stan;
  constructor(client: Stan) {
    this.client = client;
  }
  publish(data: T['data']) {
    return new Promise((reject, resolve) => {
      this.client.publish(this.subject, JSON.stringify(data), (err) => {
        if (err) {
          return reject(err);
        }
        console.log(`Event is published from ${this.subject}`);
        resolve();
      });
    });
  }
}
