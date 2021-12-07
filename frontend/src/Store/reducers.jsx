export const currentPage = (state = 0, action) => {
    switch (action.type) {
        case "SET_CURRENT_PAGE":
            return action.payload;
        default:
            return state;
    }
};

export const AddEvents = (state = false, action) => {
    switch (action.type) {
        case "SET_ADD_EVENTS":
            return action.payload;
        default:
            return state;
    }
};

export const EditProfile = (state = false, action) => {
    switch (action.type) {
        case "SET_EDIT_PROFILE":
            return action.payload;
        default:
            return state;
    }
};

export const UserData = (state = {}, action) => {
    switch (action.type) {
        case "SET_USER_DATA":
            return action.payload;
        default:
            return state;
    }
};

export const AddUtility = (state = false, action) => {
    switch (action.type) {
        case "SET_ADD_UTILITY":
            return action.payload;
        default:
            return state;
    }
};

export const Comment_Box = (
    state = {
        postId: "",
        commentBox: false,
    },
    action
) => {
    switch (action.type) {
        case "SET_COMMENT_BOX":
            return action.payload;
        default:
            return state;
    }
};

export const showNotifications = (state = false, action) => {
    switch (action.type) {
        case "SET_NOTIFICATIONS":
            return action.payload;
        default:
            return state;
    }
};

export const newNotification = (
    state = [
        // {
        //     image: "https://res.cloudinary.com/geek-connekt/image/upload/v1637765287/profilePic_llsevw.png",
        //     title: "Deepesh",
        //     message: "liked your post!",
        //     type: "like",
        // },
    ],
    action
) => {
    switch (action.type) {
        case "SET_ALL_NEW_NOTIFICATION_BACKEND":
            return action.payload;
        case "SET_NEW_NOTIFICATION":
            return [...state, action.payload];
        default:
            return state;
    }
};

export const newNotificationCount = (state = 0, action) => {
    switch (action.type) {
        case "SET_NEW_NOTIFICATION_COUNT":
            return (state = state + 1);
        case "SET_NEW_NOTIFICATION_COUNT_BACKEND":
            return (state = action.payload);
        default:
            return state;
    }
};

export const showAchievementsForm = (state = false, action) => {
    switch (action.type) {
        case "SET_ACHIEVEMENTS_FORM":
            return action.payload;
        default:
            return state;
    }
};

export const achievements = (state = [], action) => {
    switch (action.type) {
        case "SET_ACHIEVEMENTS":
            return action.payload;
        case "ADD_ACHIEVEMENTS":
            return [...state, ...action.payload];
        default:
            return state;
    }
};

export const ImagesGridLength = (state = 0, action) => {
    switch (action.type) {
        case "SET_GRID_LENGTH":
            return action.payload;
        default:
            return state;
    }
};

export const loading = (state = false, action) => {
    switch (action.type) {
        case "SET_LOADING":
            return action.payload;
        default:
            return state;
    }
};

export const reloadUtilities = (state = false, action) => {
    switch (action.type) {
        case "SET_RELOAD_UTILITIES":
            return action.payload;
        default:
            return state;
    }
};

export const reloadEvents = (state = false, action) => {
    switch (action.type) {
        case "SET_RELOAD_EVENTS":
            return action.payload;
        default:
            return state;
    }
};


export const pdfFile = (state = null, action) => {
    switch (action.type) {
        case "SET_PDF_FILE":
            return action.payload;
        default:
            return state;
    }
};
