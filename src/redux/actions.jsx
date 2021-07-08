const initialState = {
  token: "",
  username: "",
  email: "",
  first_name: "",
  last_name: "",
  is_active: "",
  is_staff: "",
  uuid: "",
};

const applyLoginUser = (state, action) => {
  const newState = { ...state, token: action.payload };
  return newState;
};

const applyUserState = (state, action) => {
  const newState = { token: state.token, ...action.payload };
  return newState;
};

const applyUserInfo = (state, action) => {
  const newState = { ...state, userInfo: { ...action.payload } };
  return newState;
};

const applyLogoutUser = () => {
  const newState = initialState;
  return newState;
};

const applyStoryNotification = (state, action) => {
  return { comment: state.comment, story: action.payload };
};

const applyCommentNotification = (state, action) => {
  return { story: state.story, comment: action.payload };
};

export {
  applyLoginUser,
  applyUserState,
  applyLogoutUser,
  applyUserInfo,
  applyCommentNotification,
  applyStoryNotification,
};
