import React from 'react';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import './ContactSupportButton.css';

export const ContactSupportButton = () => {
  const launchSupport = () => {
    //launch modal for support
    alert('Hi, there isn\'t a support modal yet... Check back soon')
  }
  return (
    <div className="support-wrapper" onClick={launchSupport}>
      <ChatBubbleOutlineIcon color="primary"/>
      <span className="support-text">Contact Support</span>
    </div>
  )
}