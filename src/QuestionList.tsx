import Question from "./Question";
import { QuestionData } from "./QuestionData";

interface Props {
  data: QuestionData[];
}

const QuestionList = ({ data }: Props) => {
  return (
    <ul>
      {data.map((question) => (
        <li key={question.questionId}>
          <Question data={question} />
        </li>
      ))}
    </ul>
  );
};

export default QuestionList;