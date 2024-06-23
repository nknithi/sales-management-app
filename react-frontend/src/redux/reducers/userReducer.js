// Define the initial state for the user reducer
const initialState = {
    // Initial user state is an empty object
    user: {}
}

// Define the userReducer function that handles state transitions based on the action type
export const userReducer = (state = initialState, action) => {
    switch (action.type) {

        // Handle the case when login is successful
        case "LOGIN_SUCCESS":
            return {
                ...state, user: action.payload
            }

        // Handle the case when login fails
        case "LOGIN_ERROR":
            return initialState;

        // Return the current state if the action type does not match any cases
        default:
            // No state change
            return state;
    }
}