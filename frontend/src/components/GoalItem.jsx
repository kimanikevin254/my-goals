import React from 'react'

function GoalItem({ goal }) {
  return (
    <div className='goal'>
        {new Date(goal.createdAt).toLocaleString('en-US')}
        <h2>{goal.text}</h2>
    </div>
  )
}

export default GoalItem