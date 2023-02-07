import { Icon } from "@iconify/react";

const PageHeader = ({ icon, name }) => {
  return (
    <header className="flex items-center h-[5vh] px-5 border-b sticky top-0 left-0 z-[99] bg-white">
      <h2 className="md:text-xl text-lg font-medium flex items-center gap-5">
        <Icon icon={icon} className="md:text-4xl text-2xl" />
        {name}
      </h2>
    </header>
  );
};

export default PageHeader;
