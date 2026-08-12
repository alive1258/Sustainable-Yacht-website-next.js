import Footer from "@/src/components/Shared/Footer/Footer";
import Navbar from "@/src/components/Shared/Navbar/Navbar";

const CommonLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <>
      <Navbar />
      {children}
     <Footer />
    </>
  );
};

export default CommonLayout;
