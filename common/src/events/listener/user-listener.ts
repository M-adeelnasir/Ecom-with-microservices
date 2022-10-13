import { Subject } from '../subjects';

export interface UserCreated {
  subject: Subject.UserCreated;
  data: {
    _id: string;
    email: string;
    verified: string;
    role: string;
    googleId?: string;
  };
}
export interface SessionCreated {
  subject: Subject.UserCreated;
  data: {
    _id: string;
    email: string;
    verified: string;
    role: string;
    googleId?: string;
  };
}
export interface SessionDelete {
  subject: Subject.UserCreated;
  data: {
    _id: string;
    email: string;
    verified: string;
  };
}
