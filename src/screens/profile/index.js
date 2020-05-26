import React, {useContext} from 'react';
import {AuthContext} from '../../authContext';
import UserDetails from '../../components/userDetails';

export default function ProfileScreen({route}) {
  const {username} = useContext(AuthContext);

  return <UserDetails username={username} isEditable={true} />;
}
