import { createBrowserRouter } from "react-router";
import Root from "../RootLayout/Root";
import Home from "../HomeLayout/Home";

export const router = createBrowserRouter([
    {
        path:"/",
        element:<Root/>,
        children:[
            {
                index:true,
                element:<Home/>
            }
        ]
    }
])