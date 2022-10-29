const initState = {
    currentPageTitle: "Hello world",
};

const rootReducer = (
    state = initState,
    action: { type: string; value: any }
) => {
    console.log(state);
    switch (action.type) {
        case "CHANGE_PAGE_TITLE":
            const newState = JSON.parse(JSON.stringify(state));
            newState.currentPageTitle = action.value;
            return newState;

        default:
            return state;
    }
};

export default rootReducer;
