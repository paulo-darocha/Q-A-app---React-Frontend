/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { AppState, searchedQuestionsAction, searchingQuestionsAction } from "../dataStore/Store";
import Page from "../Page";
import { searchQuestions } from "../QuestionData";
import QuestionList from "../QuestionList";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("criteria") || "";
  const dispatch = useDispatch();
  const questions = useSelector((state: AppState) => state.questions.searched);

  React.useEffect(() => {
    const fetchData = async (criteria: string) => {
      dispatch(searchingQuestionsAction());
      const results = await searchQuestions(criteria);
      dispatch(searchedQuestionsAction(results));
    };
    fetchData(search);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <Page title="Search Results">
      {search && (
        <p>
          for "{search}"
        </p>
      )}
      <QuestionList data={questions} />
    </Page>
  );
};

export default SearchPage;