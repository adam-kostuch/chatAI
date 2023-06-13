export type RegistrationProps = {
  displayName: string;
  email: string;
  password: string;
};

export type LoginProps = {
  login: string;
  password: string;
};

export type Chatter = {
  email: string;
  displayName: string;
  profileUrl: string;
  hasUnreadMessages: boolean;
};

export type Message = {
  message: string;
  isUsersMessage: boolean;
  date: number;
};

export type FirestoreMessage = Omit<Message, 'isUsersMessage'> & {
  userEmail: string;
  userName: string;
  chatterEmail: string;
  chatterName: string;
  isRead: boolean;
};

export type AllMessages = {
  activeChatter: Chatter;
  setActiveChatter: (chatter: Chatter) => void;
};

export const COOKIE_TOKEN = 'token';
export const LATEST_CHATTER = 'latestChatter';
export const ALL_CHATTERS = 'allChatters';
export const ACTIVE_USER = 'activeUser';

export enum CHAT_PARTNER {
  ROBOT = 'robot',
  REALTIME = 'realtime',
}
