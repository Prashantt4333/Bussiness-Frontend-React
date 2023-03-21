import React from 'react'
import { Navigate } from 'react-router-dom';

const Detail = ({user}) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return (
    <div>
      Detail
    </div>
  )
}

export default Detail
