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
<<<<<<< HEAD
=======


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
>>>>>>> 068cc4411acf7bb43d7ad522c1cafb0b04cb59fc
