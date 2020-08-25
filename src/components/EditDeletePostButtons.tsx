import { Box, IconButton, Link } from "@chakra-ui/core";
import NextLink from "next/link";
import React from "react";
import { useDeletePostMutation } from "../generated/graphql";

interface Props {
  id: number;
}

export const EditDeletePostButtons: React.FC<Props> = ({ id }) => {
  const [, deletePost] = useDeletePostMutation();

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
          deletePost({ id });
        }}
      />
    </Box>
  );
};
