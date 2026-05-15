import { createBrowserRouter } from 'react-router-dom';
import { RootLayout } from '../components/RootLayout'; // Asigură-te că importul e corect
import { Home } from "../pages/Home";
import { AddBookmarkPage } from "../pages/AddBookmark";
import{ArchivePage} from "../pages/Archive"

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
        path:"/archive",
        element:<ArchivePage/>,
      }
    ],
  },
]);