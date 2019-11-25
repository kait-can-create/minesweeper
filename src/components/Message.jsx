import React from 'react'

const Message = props => {
  return (
    <>
      <h3 className="winOrLossMsg">{props.displayResult}</h3>
    </>
  )
}

export default Message