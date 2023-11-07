import { useAppDispatch, useAppSelector } from "hooks/redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { auth } from "redux/slices/userSlice";
import { useEffect } from "react";
import Home from "pages/Home";
import SignIn from "pages/SignIn";
import SignUp from "pages/SignUp";
import PagesLoader from "components/UI-kit/Loaders/Loaders";

function App() {
  const isAuth = useAppSelector((state) => state.user.profile);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(auth());
  }, []);

  return (
    <Routes>
      {isAuth ? (
        <>
          <Route path="*" element={<Home />} />
          {/* <Route path="/sign-in" element={<Navigate to="/" replace />} />
          <Route path="/sign-up" element={<Navigate to="/" replace />} /> */}
        </>
      ) : (
        <>
          <Route path="*" element={<SignIn />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </>
      )}
    </Routes>
  );
}

export default App;
