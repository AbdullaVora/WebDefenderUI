import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../store/slices/userSlice";

const store = configureStore({
    reducer: {
        users: userReducer,  // Ensure this matches the `useSelector` path
    },
});

export default store;
