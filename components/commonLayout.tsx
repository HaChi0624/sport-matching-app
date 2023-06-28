import Footer from "./footer";
import Header from "./header";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {/* <Header /> */}
      {children}
      <Footer />
    </>
  );
};

export default CommonLayout;
