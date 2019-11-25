import React from 'react'

const Fields = props => {
  return (
    <>
      <td
        onClick={props.lClick}
        onContextMenu={e => {
          props.rClick()
        }}
      >
        {props.display}
      </td>
    </>
  )
}
export default Fields