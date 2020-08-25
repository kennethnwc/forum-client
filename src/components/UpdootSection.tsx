import { Flex, IconButton } from "@chakra-ui/core";
import { useState } from "react";
import {
  PostSnippetFragment,
  useVoteMutation,
  VoteMutation,
} from "../generated/graphql";
import gql from "graphql-tag";
import { ApolloCache } from "@apollo/client";

interface Props {
  //   post: PostQuery["posts"]["posts"][0];
  post: PostSnippetFragment;
}

const updateAfterVote = (
  value: number,
  postId: number,
  cache: ApolloCache<VoteMutation>
) => {
  const data = cache.readFragment<PostSnippetFragment>({
    id: "Post:" + postId,
    fragment: gql`
      fragment _ on Post {
        id
        points
        voteStatus
      }
    `,
  });

  if (data) {
    if (data.voteStatus === value) {
      return;
    }
    const newPoints =
      (data.points as number) + (!data.voteStatus ? 1 : 2) * value;
    cache.writeFragment({
      id: "Post:" + postId,
      fragment: gql`
        fragment __ on Post {
          points
          voteStatus
        }
      `,
      data: { id: postId, points: newPoints, voteStatus: value },
    });
  }
};

export const UpdootSection: React.FC<Props> = ({ post }) => {
  const [loading, setLoading] = useState<
    "updoot-loading" | "downdoot-loading" | "not-loading"
  >("not-loading");
  const [vote] = useVoteMutation();
  return (
    <Flex direction="column" alignItems="center" justifyContent="center" mr={4}>
      <IconButton
        onClick={async () => {
          if (post.voteStatus === 1) {
            return;
          }
          setLoading("updoot-loading");
          await vote({
            variables: { postId: post.id, value: 1 },
            update: (cache) => updateAfterVote(1, post.id, cache),
          });
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
          await vote({
            variables: { postId: post.id, value: -1 },
            update: (cache) => updateAfterVote(-1, post.id, cache),
          });
          setLoading("not-loading");
        }}
      ></IconButton>
    </Flex>
  );
};
