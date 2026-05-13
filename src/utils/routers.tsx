import { createBrowserRouter } from 'react-router-dom';
import { RootLayout } from '../components/RootLayout'; // Asigură-te că importul e corect
import { Home } from "../pages/Home";
import { AddBookmarkPage } from "../pages/AddBookmark";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />, // ACESTA este părintele care dă fundalul și Header-ul
    children: [
      {
        path: "/", // Când ești pe "/", randează Home în interiorul Layout-ului
        element: <Home />,
      },
      {
        path: "/add", // Când ești pe "/add", randează AddBookmarkPage în interiorul Layout-ului
        element: <AddBookmarkPage />,
      },
    ],
  },
]);