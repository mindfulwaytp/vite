import { useMemo } from "react";
import { RESOURCES } from "../config/resources.config";

export function useIntranetSearch({ posts = [], links = [] }) {
  return useMemo(() => {
    const resourceItems = Object.entries(RESOURCES).flatMap(
    ([categoryId, category]) =>
        (category.items ?? []).map((item) => {
        const tags = Array.isArray(item.tags)
            ? item.tags
            : item.tags
            ? [item.tags]
            : [];

        return {
            id: `resource-${categoryId}-${item.id}`,
            type: "resource",
            title: item.title,
            tags,
            text: [
            item.title,
            item.description,
            ...tags,
            category.title,
            ]
            .filter(Boolean)
            .join(" ")
            .toLowerCase(),
            url: `/intranet/resources/${categoryId}/${item.id}`,
            meta: category.title,
        };
        })
    );


    const postItems = posts.map((p) => ({
      id: `post-${p.id}`,
      type: "post",
      title: p.title,
      text: `${p.title} ${p.body}`.toLowerCase(),
      url: `/intranet/posts/${p.id}`,
      meta: p.pinned ? "Pinned post" : "Post",
    }));

    const linkItems = links.map((l) => ({
      id: `link-${l.id}`,
      type: "link",
      title: l.title,
      text: `${l.title} ${l.description}`.toLowerCase(),
      url: l.url,
      meta: "Link",
    }));

    return [...resourceItems, ...postItems, ...linkItems];
  }, [posts, links]);
}
