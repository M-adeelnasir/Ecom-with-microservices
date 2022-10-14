import { Message } from 'node-nats-streaming';
import { QueueGroup } from './queue-group-name';
import { signupUser } from '../services/user.service';

import { Listener, Subject, UserCreated } from '@shopproduct/common-module';

export class UsercreatedListener extends Listener<UserCreated> {
  subject: Subject.UserCreated = Subject.UserCreated;
  queueGroupName = QueueGroup.queueGroupName;

  async onMessage(data: UserCreated['data'], msg: Message) {
    // console.log(data);

    const user = await signupUser(data);
    if (!user) {
      throw new Error('User saved to product db failed');
    }
    console.log(user);
    msg.ack();
  }
}
