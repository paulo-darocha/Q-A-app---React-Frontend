import React from "react";
import Page from "./Page";
import PageTitle from "./PageTitle";
import { getUnansweredQuestions, QuestionData } from "./QuestionData";
import QuestionList from "./QuestionList";

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
      <div>
        <div>
          <PageTitle>Unanswered Questions</PageTitle>
          <button onClick={onClickAskQuestion}>
            Ask a question
          </button>
        </div>
        {questions ? <QuestionList data={questions} /> : "Loading . . . "}
      </div>
    </Page>
  );
};

export default HomePage;