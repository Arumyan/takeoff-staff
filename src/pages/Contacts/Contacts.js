import React from 'react'
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
const Contacts = () => {

  const history = useHistory();
  const { isAuth } = useSelector((state) => state.authReducer)

  if(!isAuth) {
    history.push('/login')
  }

  return (
    <div>
      Contacts
    </div>
  )
}

export default Contacts
