/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";
import Page from "./Page";
import PageTitle from "./PageTitle";
import { getUnansweredQuestions, QuestionData } from "./QuestionData";
import QuestionList from "./QuestionList";
import { PrimaryButton } from "./Styles";

const HomePage = () => {
  const [questions, setQuestions] = React.useState<QuestionData[]>();

  React.useEffect(() => {
    const fetchData = async () => {
      const unansweredQuestions = await getUnansweredQuestions();
      setQuestions(unansweredQuestions);
    };
    fetchData();
  }, []);

  const onClickAskQuestion = () => {
    console.log("TODO - move to the AskPage");
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
      {questions ? <QuestionList data={questions} /> : "Loading . . . "}
    </Page>
  );
};

export default HomePage;