import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";

import { MantineProvider, ColorSchemeProvider, ColorScheme } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import reportWebVitals from "./reportWebVitals";

import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage/SignupPage";
import MainPage from "./pages/MainPage";
import DashboardPage from "./pages/DashboardPage";
import DiscoverPage from "./pages/DiscoverPage";

import store from "./store";
import DeckEditorPage from "./pages/DeckEditorPage";
import AccountPage from "./pages/AccountPage/AccountPage";
import StudyPage from "./pages/StudyPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import Error404 from "./components/Error404";
import { useAppSelector } from "./hooks/hooks";
import { useGetUserQuery } from "./features/api/apiSlice";
import { themeDefault } from "./sharedStyles";

const App = () => {
  const userId = useAppSelector((state: any) => state.user.id);
  const { data: currentUser = {} } = useGetUserQuery(userId);
  const [colorScheme, setColorScheme] = useState<ColorScheme>(currentUser.preferences?.colorScheme ?? "light");
  const toggleColorScheme = (value?: ColorScheme) => setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  useEffect(() => {
    if (currentUser.preferences?.colorScheme) {
      setColorScheme(currentUser.preferences.colorScheme);
    }
  }, [currentUser]);
  const theme: any = { ...themeDefault, colorScheme };

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
        <Notifications />
        <ModalsProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="signup" element={<SignupPage />} />
              <Route path="main" element={<MainPage />}>
                <Route path="learn" element={<StudyPage />} />
                <Route path="discover" element={<DiscoverPage />} />
                <Route path="dashboard" element={<DashboardPage />} />
                <Route path="account" element={<AccountPage />} />
                <Route path="editor" element={<DeckEditorPage />} />
                <Route index element={(<DashboardPage />)} />
              </Route>
              <Route
                path="*"
                element={(
                  <main style={{ padding: "1rem" }}>
                    <Error404 />
                  </main>
                  )}
              />
            </Routes>
          </BrowserRouter>
        </ModalsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
