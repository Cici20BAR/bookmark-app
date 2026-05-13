import { RouterProvider } from "react-router-dom";

import { BookmarkProvider } from "./context/BookmarkContext"; 

import { router } from "./utils/routers"; 

function App() {
  return (
  
    <BookmarkProvider>
      
      
      <RouterProvider router={router} />

    </BookmarkProvider>
  );
}

export default App;