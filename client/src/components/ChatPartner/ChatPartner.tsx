import React from 'react';
import useCheckAuthentication from '../../hooks/useCheckAuthentication';

const ChatPartner = () => {
  useCheckAuthentication();

  return (
    <div>
      <h1>this is choosing a partner!</h1>
    </div>
  );
};

export default ChatPartner;
