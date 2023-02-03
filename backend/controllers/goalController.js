// desc     Get all goals
// @route   GET /api/goals
// access   Private
const getGoals = (req, res) => {
    res.status(200).json({message: 'GET GOALS'})
}

// desc     Set goal
// @route   POST /api/goals
// access   Private
const setGoal = (req, res) => {
    res.status(200).json({message: 'SET GOAL'})
}

// desc     Update a goal
// @route   PUT /api/goals/:id
// access   Private
const updateGoal = (req, res) => {
    res.status(200).json({message: `UPDATE GOAL ${req.params.id}`})
}

// desc     Delete a goal
// @route   DELETE /api/goals/:id
// access   Private
const deleteGoal = (req, res) => {
    res.status(200).json({message: `DELETE GOAL ${req.params.id}`})
}

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}