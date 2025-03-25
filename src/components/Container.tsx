import React from "react";

interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="w-3/4 mx-auto mt-24 px-4 py-3 shadow-md rounded-md bg-white flex justify-center items-center min-h-[calc(100vh-10rem)]">
      {children}
    </div>
  );
};

export default Container;