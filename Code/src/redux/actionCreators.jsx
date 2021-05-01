import actionTypes from "./actionTypes";

const doAddTodo = (id, name) => {
  return {
    type: actionTypes.TODO_ADD,
    todo: { id, name },
  };
};
const doToggleTodo = (id) => {
  return {
    type: actionTypes.TODO_TOGGLE,
    todo: { id },
  };
};
export { doAddTodo, doToggleTodo };
