/*{
    type: 'ADD_TODO',
    todo: {
        id: 0,
        name: 'Learn redux',
        complete: false
    }
} {
    type: 'REMOVE_TODO',
    id: 0
} {
    type: 'TOGGLE_TODO',
    id: 0
} {
    type: 'ADD_GOAL',
    id: 0
} {
    type: 'REMOVE_GOAL',
    id: 0
}*/

// Library code
function createStore(reducer) {

    let state
    let listeners = []

    const getState = () => state

    const subscribe = (callback) => {
        listeners.push(callback)
        return () => {
            listeners = listeners.filter(l => l != callback)
        }
    }

    const dispatch = (action) => {
        state = reducer(state, action)
        listeners.forEach(listener => listener())
    }


    return {
        getState,
        subscribe, 
        dispatch
    }
}


const ADD_TODO = 'ADD_TODO'
const REMOVE_TODO = 'REMOVE_TODO'
const TOGGLE_TODO = 'TOGGLE_TODO'

const ADD_GOAL = 'ADD_GOAL'
const REMOVE_GOAL = 'REMOVE_GOAL'

function addTodoAction(todo){
    return {
        type:ADD_TODO,
        todo
    }
}
function removeTodoAction(id){
    return{
        action:REMOVE_TODO, 
        id:id
    }
}
function toggleTodoAction(id){
    return{
        action:TOGGLE_TODO, 
        id:id
    }
}

function addGoalAction(goal){
    return {
        type:ADD_GOAL,
        goal
    }
}
function removeGoalAction(id){
    return{
        action:REMOVE_GOAL, 
        id:id
    }
}

function todos(state = [], action) {

    switch (action.type) {
        case ADD_TODO:
            return state.concat([action.todo])
        case REMOVE_TODO:
            return state.filter((todo) => todo.id != action.id)
        case TOGGLE_TODO:
            return state.map((todo) => todo.id != action.id ? todo :
                Object.assign({}, todo, { complete: !todo.complete })
            )
        default:
            return state
    }
}

function goals(state = [], action) {
    switch (action.type) {
        case ADD_GOAL:
            return state.concat([action.goal])
        case REMOVE_GOAL:
            return state.filter((goal) => goal.id != action.id)
        default:
            return state
    }
}

function app(state={}, action) {
    return {
        todos: todos(state.todos, action),
        goals: goals(state.goals, action)
    }
}


const store = createStore(app)

store.dispatch()
