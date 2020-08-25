import { Box, IconButton, Link } from "@chakra-ui/core";
import NextLink from "next/link";
import React from "react";
import { useDeletePostMutation, useMeQuery } from "../generated/graphql";

interface Props {
  id: number;
  creatorId: number;
}

export const EditDeletePostButtons: React.FC<Props> = ({ id, creatorId }) => {
  const [deletePost] = useDeletePostMutation();
  const { data: meData } = useMeQuery();
  if (meData?.me?.id !== creatorId) {
    return null;
  }

  return (
    <Box>
      <NextLink href="/post/edit/[id]" as={`/post/edit/${id}`}>
        <IconButton as={Link} mr={4} icon="edit" aria-label="edit post" />
      </NextLink>
      <IconButton
        ml="auto"
        icon="delete"
        aria-label="delete post"
        onClick={() => {
          deletePost({ variables: { id } });
        }}
      />
    </Box>
  );
};
