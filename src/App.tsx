import { RouterProvider } from "react-router-dom";

import { BookmarkProvider } from "./context/BookmarkContext"; 

import { router } from "./utils/routers"; 
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
  <ThemeProvider>
    <BookmarkProvider>
      
      
      <RouterProvider router={router} />

    </BookmarkProvider>
    </ThemeProvider>
  );
}

export default App;