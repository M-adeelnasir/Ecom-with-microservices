import { Message } from 'node-nats-streaming';
import { QueueGroup } from './queue-group-name';
import { signupUser } from '../services/auth.service';

import { Listener, Subject, UserCreated } from '@shopproduct/common-module';

export class UsercreatedListener extends Listener<UserCreated> {
  subject: Subject.UserCreated = Subject.UserCreated;
  queueGroupName = QueueGroup.queueGroupName;
  async OnMessage(data: UserCreated['data'], msg: Message) {
    const user = await signupUser(data);
    if (!user) {
      throw new Error('User saved to product db failed');
    }

    msg.ack();
  }
}
