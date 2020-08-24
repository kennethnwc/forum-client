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
          if (post.voteStatus === 1) {
            return;
          }
          setLoading("updoot-loading");
          await vote({ postId: post.id, value: 1 });
          setLoading("not-loading");
        }}
        variantColor={post.voteStatus === 1 ? "green" : undefined}
        icon="chevron-up"
        aria-label="Up vote"
        isLoading={loading === "updoot-loading"}
      ></IconButton>
      {post.points}
      <IconButton
        icon="chevron-down"
        variantColor={post.voteStatus === -1 ? "red" : undefined}
        aria-label="Down vote"
        isLoading={loading === "downdoot-loading"}
        onClick={async () => {
          if (post.voteStatus === -1) {
            return;
          }
          setLoading("downdoot-loading");
          await vote({ postId: post.id, value: -1 });
          setLoading("not-loading");
        }}
      ></IconButton>
    </Flex>
  );
};
