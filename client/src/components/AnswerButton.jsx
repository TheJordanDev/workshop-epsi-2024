import React from 'react'

function AnswerButton({ id, color, size, onChange}) {
    return (
      <>
        <input type='radio' name='answer' id={id} onChange={onChange} />
        <label
          htmlFor={id}
          style={{
            color: color, // Use color for the label
            display: 'inline-block',
            cursor: 'pointer',
          }}
        ></label>
      </>
    )
  }
  
  export default AnswerButton