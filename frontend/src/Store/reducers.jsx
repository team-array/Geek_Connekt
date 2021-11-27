export const currentPage = (
    state = 0,
    action
) => {
    switch (action.type) {
        case "SET_CURRENT_PAGE":
            return action.payload;
        default:
            return state;
    }
};


export const AddEvents = (
    state = false,
    action
) => {
    switch (action.type) {
        case "SET_ADD_EVENTS":
            return action.payload;
        default:
            return state;
    }
};

export const EditProfile = (
    state = false,
    action
) => {
    switch (action.type) {
        case "SET_EDIT_PROFILE":
            return action.payload;
        default:
            return state;
    }
};

export const AddUtility = (
    state = false,
    action
) => {
    switch (action.type) {
        case "SET_ADD_UTILITY":
            return action.payload;
        default:
            return state;
    }
};