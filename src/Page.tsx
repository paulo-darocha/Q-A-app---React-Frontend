/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import PageTitle from "./PageTitle";

interface Props {
  title?: string;
  children: React.ReactNode;
}

const Page = ({ title, children }: Props) => {
  return (
    <div css={css `
      margin: 50px auto 20px auto;
      padding: 30px 20px;
      max-width: 600px;
      border: 1px dashed red;
    `}>
      {title && <PageTitle>{title}</PageTitle>}
      {children}
    </div>
  );
};

export default Page;