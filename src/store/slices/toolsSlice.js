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
export const subDomainUrl = createAsyncThunk(
    "/tools/subDomain",
    async (data, { rejectWithValue }) => {
        try {
            console.log("Starting scan for URL: ", data);
            const response = await apiInstance.post("/api/tools/subdomain-scan", data);
            console.log("Scan started: ", response.data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Error in subDomainUrl");
        }
    }
);

// GET request to fetch scan results
export const fetchSubDomainData = createAsyncThunk(
    "/tools/fetchSubDomainData",
    async (domain, { rejectWithValue }) => {
        try {
            console.log("Fetching scan results for domain: ", domain);
            const response = await apiInstance.get(`/api/tools/scan-status/${domain}`);
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
            .addCase(subDomainUrl.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(subDomainUrl.fulfilled, (state, action) => {
                state.loading = false;
                state.response.push(action.payload);
                state.status = true;
            })
            .addCase(subDomainUrl.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.status = false;
            })

            // Handle GET request (fetchSubDomainData)
            .addCase(fetchSubDomainData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSubDomainData.fulfilled, (state, action) => {
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
            .addCase(fetchSubDomainData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { updateScanResults } = toolsSlice.actions;
export default toolsSlice.reducer;