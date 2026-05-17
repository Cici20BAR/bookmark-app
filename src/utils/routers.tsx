import { createBrowserRouter } from 'react-router-dom';
import { RootLayout } from '../components/RootLayout'; 
import { Home } from "../pages/Home";
import { AddBookmarkPage } from "../pages/AddBookmark";
import{ArchivePage} from "../pages/Archive"
import{SettingsPage} from "../pages/Settings";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/add", 
        element: <AddBookmarkPage />,
      },
      {
        path: "/add/:bookmarkId",
        element: <AddBookmarkPage />,
      },
      {
        path:"/archive",
        element:<ArchivePage/>,
      },
      {
        path:"/settings",
        element:<SettingsPage/>

      }
    ],
  },
]);
