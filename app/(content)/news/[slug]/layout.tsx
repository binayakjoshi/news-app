import { ReactNode } from "react";

type NewsDetailLayoutProps = {
  children: ReactNode;
  modal: ReactNode;
};

const NewsDetailLayout = ({ children, modal }: NewsDetailLayoutProps) => {
  return (
    <>
      {modal}
      {children}
    </>
  );
};
export default NewsDetailLayout;
