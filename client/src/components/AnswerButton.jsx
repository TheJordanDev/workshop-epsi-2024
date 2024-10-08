import React from 'react'

function AnswerButton({ id, color, onChange, checked}) {
    return (
      <>
        <input type='radio' name='answer' id={id} onChange={onChange} checked={checked} />
        <label
          htmlFor={id}
          style={{
            color: color,
            display: 'inline-block',
            cursor: 'pointer',
          }}
        ></label>
      </>
    )
  }
  
  export default AnswerButton