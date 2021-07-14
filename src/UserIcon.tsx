/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import user from "./user.svg";

const UserIcon = () => {
  return (
    <img 
      src={user} alt="User" 
      css={css `
      width: 14px;
      opacity: 0.6;
    `}/>
  );
};

export default UserIcon;