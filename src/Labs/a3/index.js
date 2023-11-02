import TodoItem from "./todo/TodoItem";
import TodoList from "./todo/TodoList";
import JavaScript from "./JavaScript";
import Classes from "./Classes";
import ConditionalOutput from "./ConditionalOutput";
import PathParameters from "./PathParameters";
import { useSelector } from "react-redux";

function Assignment3() {
  const { todos } = useSelector((state) => state.todosReducer);
    return (
      <div className="container">
        <h1>Assignment 3</h1>
        <ul className="list-group">
        {todos.map((todo) => (
          <li className="list-group-item" key={todo.id}>
            {todo.title}
          </li>
        ))}
      </ul>
        <ConditionalOutput/>
        <TodoItem/>
        <TodoList/>
        <JavaScript/>
         <Classes/>
         <PathParameters/>
      </div>
    );
  }
  export default Assignment3;