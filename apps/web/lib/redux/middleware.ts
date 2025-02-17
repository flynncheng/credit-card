import type { Middleware, MiddlewareAPI } from "@reduxjs/toolkit";
import { isRejectedWithValue } from "@reduxjs/toolkit";
import { toast } from "@workspace/ui/hooks/use-toast";
import { setSessionExpired } from "./slices/authSlice";

export const rtkQueryErrorHandler: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
    if (isRejectedWithValue(action)) {
      console.log(action, "isRejectedWithValue");

      const payload = action.payload as {
        status: number;
        data: { [key: string]: string };
      };
      if (payload.status === 401) {
        api.dispatch(setSessionExpired());
      } else {
        toast({
          title: `Error: ${action.type}`,
          description: payload.data.message,
        });
      }
    }

    return next(action);
  };
