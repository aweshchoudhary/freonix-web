import Loading from "../components/Loading";

const Search = () => {
  const loading = true;
  if (loading) return <Loading />;
  return (
    <section>
      <h1>hello</h1>
    </section>
  );
};

export default Search;
