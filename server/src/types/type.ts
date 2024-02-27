export interface User {
  id: string;
  name: string;
}

export interface Message {
  author: User;
  message: string;
}
