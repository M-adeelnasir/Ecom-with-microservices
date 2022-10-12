import { Subject } from '../subjects';
import { Stan, Message } from 'node-nats-streaming';

interface event {
  subject: Subject;
  data: any;
}

export abstract class Listener<T extends event> {
  abstract subject: T['subject'];
  abstract queueGroupName: string;
  protected client: Stan;
  protected ackMode = 5 * 1000;
  abstract onMessage(data: T['data'], msg: Message): void;

  constructor(client: Stan) {
    this.client = client;
  }

  listen() {
    const subsciption = this.client.subscribe(
      this.subject,
      this.queueGroupName,
      this.subscriptionOptions()
    );

    subsciption.on('message', (msg: Message) => {
      console.log(
        `Message recived From ${this.subject} / ${this.queueGroupName}`
      );
      const parsedData = this.parsedData(msg);
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
      .setAckWait(this.ackMode)
      .setDurableName(this.queueGroupName);
  }
}
