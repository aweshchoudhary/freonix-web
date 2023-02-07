import { lazy } from "react";
import Card from "../components/Card";
import PageHeader from "../components/PageHeader";
const Header = lazy(() => import("../components/Header"));

const Home = () => {
  return (
    <>
      <Header />
      <PageHeader icon={"material-symbols:home"} name="Notifications" />
      <section>
        <Card />
        <Card />
        <Card />
        <Card />
      </section>
    </>
  );
};

export default Home;
