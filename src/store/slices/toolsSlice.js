import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiInstance from "../../api/instance";

const initialState = {
    loading: false,
    error: null,
    tools: [],
    response: [],
    scanResults: [],
    status: false,
    logs: [],
};

// POST request to start the subdomain scan
export const scanStart = createAsyncThunk(
    "/tools/subDomain",
    async ({ domain, path, custom }, { rejectWithValue }) => {
        try {
            console.log("Starting scan for URL: ", domain, path);
            const response = await apiInstance.post(`/api/tools/${path}`, { domain: domain, custom: custom }, { headers: { 'Content-Type': 'application/json' } });
            console.log("Scan started: ", response.data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Error in subDomainUrl");
        }
    }
);

// GET request to fetch scan results
export const fetchResult = createAsyncThunk(
    "/tools/fetchSubDomainData",
    async ({ domain, path }, { rejectWithValue }) => {
        try {
            console.log("Fetching scan results for domain: ", domain);
            const response = await apiInstance.get(`/api/tools/${path}-status/${domain}`, { headers: { 'Content-Type': 'application/json' } });
            console.log("Scan results: ", response.data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Error fetching scan data");
        }
    }
);

const toolsSlice = createSlice({
    name: "tools",
    initialState,
    reducers: {
        updateScanResults: (state, action) => {
            const { domain, scan } = action.payload;
            const existingDomain = state.scanResults.find(result => result.domain === domain);
            if (existingDomain) {
                existingDomain.scans.push(scan);
            } else {
                state.scanResults.push({ domain, scans: [scan] });
            }
        }
    },
    extraReducers: (builder) => {
        builder
            // Handle POST request (subDomainUrl)
            .addCase(scanStart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(scanStart.fulfilled, (state, action) => {
                state.loading = false;  
                state.response.push(action.payload);
                state.status = true;
                state.scanResults.push(action.payload.results)
            })
            .addCase(scanStart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.status = false;
            })

            // Handle GET request (fetchSubDomainData)
            .addCase(fetchResult.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchResult.fulfilled, (state, action) => {
                state.loading = false;
                const { domain, subdomains, live_subdomains, logs } = action.payload;
                const scan = {
                    timestamp: new Date().toISOString(),
                    status: "completed",
                    subdomains,
                    live_subdomains,
                    logs
                };
                state.scanResults.push({ domain, scans: [scan] });
            })
            .addCase(fetchResult.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { updateScanResults } = toolsSlice.actions;
export default toolsSlice.reducer;