import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Register from './components/Register.jsx'
import Login from './components/LogIn.jsx'
import Users from './components/Users.jsx'
import ErrorPage from './components/ErrorPage.jsx'
import Root from './components/Root.jsx'
import { AuthProvider } from './context/authContext.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: 1,
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "users",
        element: <Users />
      },
    ]
  },
]);

function App() {
  return (
      <>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </>
    )
}

export default App
