import Wrapper, { WrapperVariant } from "./Wrapper";
import NavBar from "./NavBar";

interface Props {
  variant?: WrapperVariant;
}

export const Layout: React.FC<Props> = ({ variant, children }) => {
  return (
    <>
      <NavBar />
      <Wrapper variant={variant}>{children}</Wrapper>
    </>
  );
};
