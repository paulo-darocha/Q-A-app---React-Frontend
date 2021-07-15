/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppState, gettingQuestionAction, gotQuestionAction } from "../dataStore/Store";
import Page from "../Page";
import { getQuestionById, PostAnswer } from "../QuestionData";
import {
  FieldContainer,
  FieldError,
  FieldLabel,
  Fieldset,
  FieldTextArea,
  FormButtonContainer,
  gray3,
  gray6,
  PrimaryButton,
  SubmissionSuccess
} from "../Styles";
import AnswerList from "./AnswerList";

type FormData = {
  content: string;
}

const QuestionPage = () => {
  const { questionId } = useParams();
  const dispatch = useDispatch();
  const question = useSelector((state: AppState) => state.questions.viewing);

  const [
    successfullySubmitted, setSuccessfullySubmitted
  ] = React.useState(false);

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit
  } = useForm<FormData>({
    mode: "onBlur"
  });

  React.useEffect(() => {
    const fetchData = async (questionId: number) => {
      dispatch(gettingQuestionAction());
      const foundQuestion = await getQuestionById(questionId);
      dispatch(gotQuestionAction(foundQuestion));
    };
    if (questionId) {
      fetchData(Number(questionId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionId]);

  const submitForm = async (data: FormData) => {
    const result = await PostAnswer({
      questionId: question!.questionId,
      content: data.content,
      userName: "Paulo",
      created: new Date()
    });
    setSuccessfullySubmitted(result ? true : false);
  };

  return (
    <Page>
      <div css={css`
        background-color: white;
        padding: 15px 20px 20px 20px;
        border-radius: 4px;
        border: 1px solid ${gray6};
        box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.16);
      `}>
        <div css={css`
          font-size: 19px;
          font-weight: bold;
          margin: 10px 0px 5px;
        `}>
          {question === null ? "fetching . . ." : question.title}
        </div>

        {question !== null && (
          <React.Fragment>
            <p css={css`
              margin-top: 0px;
              background-color: white;
            `}>
              {question.content}
            </p>
            <div css={css`
              font-size: 12px;
              font-style: italic;
              color: ${gray3};
            `}>
              {`Asked by ${question.userName} on 
                ${question.created.toLocaleDateString()} 
                ${question.created.toLocaleTimeString()}`}
            </div>
            <AnswerList data={question.answers} />

            <form onSubmit={handleSubmit(submitForm)}
              css={css`
              margin-top: 20px;
            `}>
              <Fieldset disabled={isSubmitting || successfullySubmitted}>
                <FieldContainer>
                  <FieldLabel htmlFor="content">
                    Your Answer
                  </FieldLabel>
                  <FieldTextArea
                    id="content"
                    {...register("content", {
                      required: true,
                      minLength: 50
                    })}
                  />
                  {errors.content && errors.content.type === "required" && (
                    <FieldError>
                      You must enter the answer
                    </FieldError>
                  )}
                  {errors.content && errors.content.type === "minLength" && (
                    <FieldError>
                      The answer must be at least 50 characters
                    </FieldError>
                  )}
                </FieldContainer>
                <FormButtonContainer>
                  <PrimaryButton type="submit">
                    Submit Your Answer
                  </PrimaryButton>
                </FormButtonContainer>

                {successfullySubmitted && (
                  <SubmissionSuccess>
                    Your answer was successfully submitted
                  </SubmissionSuccess>
                )}
              </Fieldset>
            </form>
          </React.Fragment>
        )}
      </div>
    </Page>
  );
};

export default QuestionPage;