import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";

const Explore = () => {
  return (
    <>
      <PageHeader icon={"ph:hash-bold"} name="Explore" />
      <section className="md:px-5 px-3 py-5">
        <div className="hashtags">
          <h2 className="text-2xl font-semibold">Popular Topics</h2>
          <ul className="py-5">
            <li className="py-3 px-3 border-b rounded-lg hover:bg-gray-50">
              <Link to="/">
                <p className="text-xl mb-1">#webdesign</p>
                <p>10.3k Tweets</p>
              </Link>
            </li>
            <li className="py-3 px-3 border-b rounded-lg hover:bg-gray-50">
              <Link to="/">
                <p className="text-xl mb-1">#webdesign</p>
                <p>10.3k Tweets</p>
              </Link>
            </li>
            <li className="py-3 px-3 border-b rounded-lg hover:bg-gray-50">
              <Link to="/">
                <p className="text-xl mb-1">#webdesign</p>
                <p>10.3k Tweets</p>
              </Link>
            </li>
            <li className="py-3 px-3 border-b rounded-lg hover:bg-gray-50">
              <Link to="/">
                <p className="text-xl mb-1">#webdesign</p>
                <p>10.3k Tweets</p>
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
};

export default Explore;
