// Actions
const FETCH_DATA_SUCCESS = "FETCH_DATA_SUCCESS";
const DELETE_TASK_GROUP_SUCCESS = "DELETE_TASK_GROUP_SUCCESS";
const SHOW_TASK_SUCCESS = "SHOW_TASK_SUCCESS";
const CREATE_NEW_TASK_SUCCESS = "CREATE_NEW_TASK_SUCCESS";
const LOGOUT = "LOGOUT";

// Reducer
const initialState = {
  data: [],
  currentTaskGroup: {
    id: "0",
    name: "",
  },
  taskName: "",
  todo: [],
  user: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload,
      };
    case DELETE_TASK_GROUP_SUCCESS:
      return {
        ...state,
        data: state.data.filter((taskGroup) => taskGroup.id !== action.payload),
      };
    case SHOW_TASK_SUCCESS:
      return {
        ...state,
        currentTaskGroup: {
          name: action.payload.name,
          id: action.payload.id,
        },
        todo: [],
      };
    case CREATE_NEW_TASK_SUCCESS:
      return {
        ...state,
        taskName: "",
        todo: [...state.todo, action.payload],
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
