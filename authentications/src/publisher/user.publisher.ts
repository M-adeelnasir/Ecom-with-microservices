import {
  Publisher,
  UserCreated,
  SessionCreated,
} from '@shopproduct/common-module';
import { Subject } from '@shopproduct/common-module/build/events/subjects';

export class UserCreatedPublisher extends Publisher<UserCreated> {
  subject: Subject.UserCreated = Subject.UserCreated;
}

export class SessionCreatedPublisher extends Publisher<SessionCreated> {
  subject: Subject.SessionCreated = Subject.SessionCreated;
}
