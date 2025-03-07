import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../store/slices/userSlice";
import toolsReducer from "../store/slices/toolsSlice";

const store = configureStore({
    reducer: {
        users: userReducer,  // Ensure this matches the `useSelector` path
        tools: toolsReducer,  // Ensure this matches the `useSelector` path
    },
});

export default store;
