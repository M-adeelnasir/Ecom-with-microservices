import { Message } from 'node-nats-streaming';
import { Publisher, UserCreated } from '@shopproduct/common-module';
import { Subject } from '@shopproduct/common-module/build/events/subjects';

export class UserCreatedPublisher extends Publisher<UserCreated> {
  subject: Subject.UserCreated = Subject.UserCreated;
}
