import { Subject } from '../subjects';

export interface UserCreated {
  subject: Subject.UserCreated;
  data: {
    _id: string;
    email: string;
    verified: boolean;
    role: string;
    googleId?: string;
  };
}
export interface SessionCreated {
  subject: Subject.SessionCreated;
  data: {
    _id: string;
    user: string;
    valid: boolean;
  };
}
export interface SessionDelete {
  subject: Subject.SessionDeleted;
  data: {
    _id: string;
    user: string;
  };
}
