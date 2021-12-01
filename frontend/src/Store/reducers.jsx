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

export const Comment_Box = (
    state = false,
    action
) => {
    switch (action.type) {
        case "SET_COMMENT_BOX":
            return action.payload;
        default:
            return state;
    }
};


export const showNotifications = (
    state = false,
    action
) => {
    switch (action.type) {
        case "SET_NOTIFICATIONS":
            return action.payload;
        default:
            return state;
    }
};

export const showAchievementsForm = (
    state = false,
    action
) => {
    switch (action.type) {
        case "SET_ACHIEVEMENTS_FORM":
            return action.payload;
        default:
            return state;
    }
};

export const achievements = (
    state = [],
    action
) => {
    switch (action.type) {
        case "SET_ACHIEVEMENTS":
            return action.payload
        case "ADD_ACHIEVEMENTS":
            return [...state,...action.payload];
        default:
            return state;
    }
};

export const ImagesGridLength = (
    state = 0,
    action
) => {
    switch (action.type) {
        case "SET_GRID_LENGTH":
            return action.payload;
        default:
            return state;
    }
};