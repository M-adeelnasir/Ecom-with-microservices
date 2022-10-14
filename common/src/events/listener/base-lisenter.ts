import { Subject } from '../subjects';
import { Stan, Message } from 'node-nats-streaming';

interface Event {
  subject: Subject;
  data: any;
}

export abstract class Listener<T extends Event> {
  abstract subject: T['subject'];
  abstract queueGroupName: string;
  abstract OnMessage(data: T['data'], msg: Message): void;
  protected client: Stan;
  protected ackWait = 5 * 1000;
  constructor(client: Stan) {
    this.client = client;
  }

  listen() {
    const subscription = this.client.subscribe(
      this.subject,
      this.queueGroupName,
      this.subscriptionOptions()
    );

    subscription.on('message', (msg: Message) => {
      console.log(
        `Message recived From ${this.subject} / ${this.queueGroupName}`
      );

      const parsedData = this.parsedData(msg);

      this.OnMessage(parsedData, msg);
    });
  }

  parsedData(msg: Message) {
    const data = msg.getData();

    return typeof data === 'string'
      ? JSON.parse(data)
      : JSON.parse(data.toString('utf-8'));
  }

  subscriptionOptions() {
    return this.client
      .subscriptionOptions()
      .setDeliverAllAvailable()
      .setManualAckMode(true)
      .setAckWait(this.ackWait)
      .setDurableName(this.queueGroupName);
  }
}
