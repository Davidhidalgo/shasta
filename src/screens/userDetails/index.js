import React from 'react';
import UserDetails from '../../components/userDetails';

export default function UserInfoScreen({route}) {
  const {username} = route.params;
  return <UserDetails username={username} />;
}
