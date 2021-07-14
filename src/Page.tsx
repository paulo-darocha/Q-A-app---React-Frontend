import PageTitle from "./PageTitle";

interface Props {
  title?: string;
  children: React.ReactNode;
}

const Page = ({ title = "Titulo", children }: Props) => {
  return (
    <div>
      {title && <PageTitle>{title}</PageTitle>}
      {children}
    </div>
  );
};

export default Page;