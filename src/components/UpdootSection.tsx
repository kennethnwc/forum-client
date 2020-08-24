import { Flex, IconButton } from "@chakra-ui/core";
import { PostSnippetFragment, useVoteMutation } from "../generated/graphql";
import { useState } from "react";

interface Props {
  //   post: PostQuery["posts"]["posts"][0];
  post: PostSnippetFragment;
}

export const UpdootSection: React.FC<Props> = ({ post }) => {
  const [loading, setLoading] = useState<
    "updoot-loading" | "downdoot-loading" | "not-loading"
  >("not-loading");
  const [, vote] = useVoteMutation();
  return (
    <Flex direction="column" alignItems="center" justifyContent="center" mr={4}>
      <IconButton
        onClick={async () => {
          setLoading("updoot-loading");
          await vote({ postId: post.id, value: 1 });
          setLoading("not-loading");
        }}
        icon="chevron-up"
        aria-label="Up vote"
        isLoading={loading === "updoot-loading"}
      ></IconButton>
      {post.points}
      <IconButton
        icon="chevron-down"
        aria-label="Down vote"
        isLoading={loading === "downdoot-loading"}
        onClick={async () => {
          setLoading("downdoot-loading");
          await vote({ postId: post.id, value: -1 });
          setLoading("not-loading");
        }}
      ></IconButton>
    </Flex>
  );
};
