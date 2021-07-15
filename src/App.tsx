/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { configureStore } from "./dataStore/Store";
import Header from './Header';
import HomePage from './HomePage';
import NotFoundPage from "./routes/NotFoundPage";
import QuestionPage from "./routes/QuestionPage";
import SearchPage from "./routes/SearchPage";
import SignInPage from "./routes/SignInPage";
import { fontFamily, fontSize, gray2 } from "./Styles";
const AskPage = React.lazy(() => import("./routes/AskPage"));

function App() {
  const store = configureStore();

  return (
    <Provider store={store}>
      <BrowserRouter>
        <div css={css`
        font-family: ${fontFamily};
        font-size: ${fontSize};
        color: ${gray2};
      `}>
          <Header />
          <Routes>
            <Route path="" element={<HomePage />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="ask" element={
              <React.Suspense fallback={<div
                css={css`margin-top: 100px; text-align: center;`
                }>
                Loading...
              </div>}>
                <AskPage />
              </React.Suspense>
            } />
            <Route path="signin" element={<SignInPage />} />
            <Route path="questions/:questionId" element={<QuestionPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
