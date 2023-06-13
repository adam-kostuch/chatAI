/* eslint-disable @typescript-eslint/no-empty-function */
import { FC } from 'react';
import { MessagesContent } from '.';

const RobotMessages: FC = () => {
  return (
    <MessagesContent
      messages={[]}
      newMessage=""
      handleNewMessage={() => {}}
      handleSentMessage={() => {}}
    />
  );
};

export default RobotMessages;
