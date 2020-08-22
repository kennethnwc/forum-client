import NavBar from "../components/NavBar";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { usePostQuery } from "../generated/graphql";
import { Layout } from "../components/Layout";
import NextLink from "next/link";
import { Link } from "@chakra-ui/core";

const Index = () => {
  const [{ data }] = usePostQuery();
  return (
    <Layout>
      <NextLink href="/create-post">
        <Link>create post</Link>
      </NextLink>
      <div>Hello world</div>
      <br />
      {!data ? (
        <div>Loading....</div>
      ) : (
        data.posts.map((p) => <div key={p.id}>{p.title}</div>)
      )}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
