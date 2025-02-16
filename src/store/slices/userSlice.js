import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/instance"

const initialState = {
    loading: false,
    error: null,
    users: [],
    isAuthenticated: false,
}

export const register = createAsyncThunk('/auth/register', async (data, { rejectWithValue }) => {
    try {
        const response = await api.post('/api/auth/register', data);
        if (response.status === 200) {
            const token = response.data.token;
            localStorage.setItem('auth_token', token);
        } else {
            return rejectWithValue(response.message || 'Registration failed');
        }
        return response.data;
    } catch (error) {
        return rejectWithValue(error.message || "Error registering");
    }
})

export const login = createAsyncThunk('/auth/login', async (data, { rejectWithValue }) => {
    try {
        const response = await api.post('/api/auth/login', data);
        console.log(response.data);
        
        if (response.status === 200) {
            const token = response.data.token;
            localStorage.setItem('auth_token', token);
        } else {
            return rejectWithValue('Inavalid email/password');
        }
        return response.data;
    } catch (error) {
        return rejectWithValue(error.message || "Error login");
    }
})

const userSlices = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.users.push(action.payload);
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(login.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true,
                state.users.push(action.payload);
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.isAuthenticated = false,
                state.error = action.payload;
            })
    }
})

export default userSlices.reducer;