import React from 'react';
import useCheckAuthentication from 'src/hooks/useCheckAuthentication';

const RobotChat = () => {
  useCheckAuthentication();

  return (
    <div>
      <div>Robot chat here</div>
    </div>
  );
};

export default RobotChat;
