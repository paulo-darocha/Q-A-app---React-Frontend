interface Props {
  children: React.ReactNode;
}

const PageTitle = ({ children }: Props) => {
  return (
    <h2>{children}</h2>
  );
};

export default PageTitle;