import { Message } from 'node-nats-streaming';
import { SessionCreated, Listener, Subject } from '@shopproduct/common-module';
import { QueueGroup } from './queue-group-name';
import { createSession } from '../services/session.service';

export class SessionCreatedListener extends Listener<SessionCreated> {
  subject: Subject.SessionCreated = Subject.SessionCreated;
  queueGroupName = QueueGroup.queueGroupName;
  async OnMessage(data: SessionCreated['data'], msg: Message) {
    const session = await createSession(data._id, data.user, data.valid);
    if (!session) {
      throw new Error('Session creat failed in product service');
    }
    msg.ack();
  }
}
