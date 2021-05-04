import { doCheckUserState, doLoginUser, doLogoutUser } from "./actionCreators";

const getUserInfo = (state) => state.userState;

export const mapStateToPropsHeader = (state) => {
    return {
        loggedUser: getUserInfo(state),
    };
};

export const mapStateToPropsLogin = (state) => {
    return {
        loggedUser: getUserInfo(state),
    };
};

export const mapDispatchToPropsLogin = (dispatch) => {
    return {
        onLoginUser: (id) => dispatch(doLoginUser(id)),
        onStateUser: (info) => dispatch(doCheckUserState(info)),
    };
};

export const mapStateToAccount = (state) => {
    return {
        loggedUser: getUserInfo(state),
    };
};

export const mapStateToApp = (state) => {
    return {
        loggedUser: getUserInfo(state),
    };
};

export const mapDispatchToApp = (dispatch) => {
    return {
        onStateUser: (info) => dispatch(doCheckUserState(info)),
    };
};

export const mapDispatchToAccount = (dispatch) => {
    return {
        onLogoutUser: () => dispatch(doLogoutUser()),
        onStateUser: (info) => dispatch(doCheckUserState(info)),
    };
};
