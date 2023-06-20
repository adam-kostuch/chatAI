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

export type RealtimeMessage = {
  message: string;
  isUsersMessage: boolean;
  date: number;
};

export type RobotMessage = RealtimeMessage & {
  userEmail: string;
  userName: string;
};

export type FirestoreRealtimeMessage = Omit<
  RealtimeMessage,
  'isUsersMessage'
> & {
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
