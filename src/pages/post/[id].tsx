import { Box, Heading } from "@chakra-ui/core";
import React from "react";
import { EditDeletePostButtons } from "../../components/EditDeletePostButtons";
import { Layout } from "../../components/Layout";
import { useGetPostFromUrl } from "../../utils/useGetPostFromUrl";
import { withApollo } from "../../utils/withApollo";

interface Props {}

const Post: React.FC<Props> = () => {
  const { data, loading } = useGetPostFromUrl();
  if (loading) {
    return (
      <Layout>
        <div>Loading...</div>
      </Layout>
    );
  }

  if (!data?.post) {
    return (
      <Layout>
        <Box>Could not find post</Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <Heading mb={4}>{data.post.title}</Heading>
      <Box mb={4}>{data.post.text}</Box>
      <EditDeletePostButtons
        creatorId={data.post.creatorId}
        id={data.post.id}
      />
    </Layout>
  );
};

export default withApollo({ ssr: true })(Post);
