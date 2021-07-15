import React from "react";
import { useForm } from "react-hook-form";
import Page from "../Page";
import { postQuestion } from "../QuestionData";
import {
  FieldContainer,
  FieldError,
  FieldInput,
  FieldLabel,
  Fieldset,
  FieldTextArea,
  FormButtonContainer,
  PrimaryButton,
  SubmissionSuccess
} from "../Styles";

type FormData = {
  title: string;
  content: string;
};

const AskPage = () => {
  const [successfullySubmitted, setSuccessfullySubmitted] = React.useState(false);
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit
  } = useForm<FormData>({
    mode: "onBlur"
  });

  const submitForm = async (data: FormData) => {
    const result = await postQuestion({
      title: data.title,
      content: data.content,
      userName: "Paulo",
      created: new Date()
    });
    setSuccessfullySubmitted(result ? true : false);
  };

  return (
    <Page title="Ask a question">
      <form onSubmit={handleSubmit(submitForm)}>
        <Fieldset disabled={isSubmitting || successfullySubmitted}>
          <FieldContainer>
            <FieldLabel htmlFor="title">
              Title
            </FieldLabel>
            <FieldInput
              {...register("title", {
                required: true,
                minLength: 10
              })}
              id="title"
              type="text"
            />
            {errors.title && errors.title.type === "required" && (
              <FieldError>
                You must enter the question title
              </FieldError>
            )}
            {errors.title && errors.title.type === "minLength" && (
              <FieldError>
                The title must be at least 10 characters
              </FieldError>
            )}
          </FieldContainer>

          <FieldContainer>
            <FieldLabel htmlFor="content">
              Content
            </FieldLabel>
            <FieldTextArea
              {...register("content", {
                required: true,
                minLength: 50
              })}
              id="content"
            />
            {errors.content && errors.content.type === "required" && (
              <FieldError>
                You must enter the question content
              </FieldError>
            )}
            {errors.content && errors.content.type === "minLength" && (
              <FieldError>
                The content must be at least 50 characters
              </FieldError>
            )}

          </FieldContainer>
          <FormButtonContainer>
            <PrimaryButton type="submit">
              Submit Your Question
            </PrimaryButton>
          </FormButtonContainer>

          {successfullySubmitted && (
            <SubmissionSuccess>
              Your question was successfully submitted
            </SubmissionSuccess>
          )}
        </Fieldset>
      </form>
    </Page>
  );
};

export default AskPage;