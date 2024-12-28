import App from "./src/App";
import ErrorPage from "./src/pages/ErrorPage";

export const routes = [
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />
    }
]