import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";

import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { themeDefault } from "./sharedStyles";

import reportWebVitals from "./reportWebVitals";

import HomePage from "./pages/HomePage/HomePage";
import SignupPage from "./pages/SignupPage/SignupPage";
import MainPage from "./pages/MainPage/MainPage";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import DiscoverPage from "./pages/DiscoverPage/DiscoverPage";

import store from "./store";
import DeckEditorPage from "./pages/DeckEditorPage/DeckEditorPage";
import AccountPage from "./pages/AccountPage/AccountPage";
import StudyPage from "./pages/StudyPage/StudyPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import Error404 from "./components/Error404";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <MantineProvider theme={themeDefault}>
      <Notifications />
      <ModalsProvider>
        <Provider store={store}>
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
        </Provider>
      </ModalsProvider>
    </MantineProvider>

  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
