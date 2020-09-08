import React from "react";
import HeaderContainer from "../../../containers/Header/HeaderContainer";

interface MainTemplateProps {
  children: React.ReactNode;
}

const MainTemplate = ({ children }: MainTemplateProps) => {
  return (
    <>
      <HeaderContainer />
      {children}
    </>
  );
};

export default MainTemplate;
