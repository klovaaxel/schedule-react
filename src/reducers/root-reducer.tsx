const initState = {
    currentPageTitle: "Schedule",
    currentPage: "home",
};

const rootReducer = (
    state = initState,
    action: {
        type: string;
        value: { currentPageTitle: string; currentPage: string };
    }
) => {
    switch (action.type) {
        case "CHANGE_PAGE":
            const newState = JSON.parse(JSON.stringify(state));
            newState.currentPageTitle = action.value.currentPageTitle;
            newState.currentPage = action.value.currentPage;
            return newState;

        default:
            return state;
    }
};

export default rootReducer;
