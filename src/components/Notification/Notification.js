import React from 'react';
import './Notification.scss'

const Notification = ({ message }) => 
  <div class="notification is-primary">{ message }</div>;

export default Notification;