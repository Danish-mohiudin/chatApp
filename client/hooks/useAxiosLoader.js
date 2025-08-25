// hooks/useAxiosLoader.js
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setLoading } from "../src/store/slice/loader/loaderSlice";
import { axiosInstance } from "../components/axiosInstance";

export default function useAxiosLoader() {
  const dispatch = useDispatch();

  useEffect(() => {
    let requestCount = 0; // Track how many requests are active
    let loaderTimer = null; // Timer for min display time
    let loaderShownAt = null;// Timestamp when loader appeared

    const ignoreLoading = ["/message/send"]; // endpoints to skip loader
    const minDisplayTime = 500; // ms

    // show loader 
    const showLoader = () => {
      loaderShownAt = Date.now();
      dispatch(setLoading(true));
    };

    // hide loader
    const hideLoader = () => {
      const elapsed = Date.now() - loaderShownAt;
      if (elapsed < minDisplayTime) {
        loaderTimer = setTimeout(() => dispatch(setLoading(false)), minDisplayTime - elapsed);
      } else {
        dispatch(setLoading(false));
      }
    };

    // ✅ Request Interceptor
    const requestInterceptor = axiosInstance.interceptors.request.use(
      (config) => {
        const shouldIgnore = ignoreLoading.some((url) => config.url.includes(url));
        if (!shouldIgnore) {
          if (requestCount === 0) showLoader(); // Only show if no other requests active
          requestCount++; // Increment active request count
        }
        return config;
      },
      (error) => {
        requestCount = Math.max(requestCount - 1, 0); // Decrement on error
        if (requestCount === 0) hideLoader();
        return Promise.reject(error);
      }
    );

    // ✅ Response Interceptor
    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response) => {
        const shouldIgnore = ignoreLoading.some((url) => response.config.url.includes(url));
        if (!shouldIgnore) {
          requestCount = Math.max(requestCount - 1, 0); // Decrement
          if (requestCount === 0) hideLoader(); // Hide if no active requests
        }
        return response;
      },
      (error) => {
        const shouldIgnore = ignoreLoading.some((url) => error.config?.url.includes(url));
        if (!shouldIgnore) {
          requestCount = Math.max(requestCount - 1, 0);
          if (requestCount === 0) hideLoader();
        }
        return Promise.reject(error);
      }
    );

    // Cleanup interceptors on unmount
    return () => {
      clearTimeout(loaderTimer);
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [dispatch]);
}
