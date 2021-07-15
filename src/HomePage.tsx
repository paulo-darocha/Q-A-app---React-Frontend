/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppState, gettingUnansweredQuestionsAction, gotUnansweredQuestionsAction } from "./dataStore/Store";
import Page from "./Page";
import PageTitle from "./PageTitle";
import { getUnansweredQuestions } from "./QuestionData";
import QuestionList from "./QuestionList";
import { PrimaryButton } from "./Styles";

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const questions = useSelector((state: AppState) => state.questions.unanswered);
  const loading = useSelector((state: AppState) => state.questions.loading);

  React.useEffect(() => {
    const fetchData = async () => {
      dispatch(gettingUnansweredQuestionsAction());
      const unansweredQuestions = await getUnansweredQuestions();
      dispatch(gotUnansweredQuestionsAction(unansweredQuestions));
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClickAskQuestion = () => {
    navigate("ask");
  };

  return (
    <Page>
      <div css={css`
        display: flex;
        align-items: center;
        justify-content: space-between;
      `}>
        <PageTitle>Unanswered Questions</PageTitle>
        <PrimaryButton onClick={onClickAskQuestion}>
          Ask a question
        </PrimaryButton>
      </div>
      {loading ? "Loading . . . " : <QuestionList data={questions} />}
    </Page>
  );
};

export default HomePage;