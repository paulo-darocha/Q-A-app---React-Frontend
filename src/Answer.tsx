/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { AnswerData } from "./QuestionData";
import { gray3 } from "./Styles";

interface Props {
  data: AnswerData;
}

const Answer = ({ data }: Props) => (
  <div css={css `
    padding: 10px 0px;
  `}>
    <div css={css `
      padding: 10px 0px;
      font-size: 14px;
    `}>
      {data.content}
    </div>
    <div css={css `
      font-size: 12px;
      font-style: italic;
      color: ${gray3};
    `}>
      {`Answere by ${data.userName} on 
        ${data.created.toLocaleDateString()}
        ${data.created.toLocaleTimeString()}`}
    </div>
  </div>
);
export default Answer;