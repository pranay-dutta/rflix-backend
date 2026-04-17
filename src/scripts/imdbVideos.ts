import axios from "axios";

const IMDB_URL = "https://caching.graphql.imdb.com/";

const headers = {
  accept: "application/graphql+json, application/json",
  "content-type": "application/json",
  "user-agent": "Mozilla/5.0",
  origin: "https://www.imdb.com",
  referer: "https://www.imdb.com/",
  "x-imdb-client-name": "imdb-web-next-localized",
};

// 1. Get one page
export const getTitleVideosPage = async (
  titleId: string,
  afterCursor?: string,
  limit = 50,
) => {
  const variables: any = {
    const: titleId,
    first: limit,
    sort: { by: "DATE", order: "ASC" },
    filter: {
      nameConstraints: {},
      titleConstraints: {},
      maturityLevel: "INCLUDE_MATURE",
    },
  };

  if (afterCursor) {
    variables.after = afterCursor;
  }

  const query = {
    query: `query TitleVideoGalleryPagination($const: ID!, $first: Int!, $after: ID, $filter: VideosQueryFilter, $sort: VideoSort) {
      title(id: $const) {
        videoStrip(first: $first, after: $after, filter: $filter, sort: $sort) {
          total
          pageInfo {
            endCursor
          }
          edges {
            position
            node {
              id
              contentType {
                displayName {
                  value
                }
              }
              name {
                value
              }
              runtime {
                value
              }
              thumbnail {
                url
              }
            }
          }
        }
      }
    }`,
    operationName: "TitleVideoGalleryPagination",
    variables,
  };

  const res = await axios.post(IMDB_URL, query, { headers });
  return res.data;
};

// 2. Get playback URLs
export const getVideoUrls = async (videoId: string) => {
  const query = {
    query: `query VideoPlaybackData($const: ID!) {
      video(id: $const) {
        playbackURLs {
          displayName {
            value
          }
          url
        }
      }
    }`,
    operationName: "VideoPlaybackData",
    variables: { const: videoId },
  };

  try {
    const res = await axios.post(IMDB_URL, query, { headers });

    const playback = res.data?.data?.video?.playbackURLs || [];

    return playback.map((p: any) => ({
      quality: p.displayName?.value || "Unknown",
      url: p.url,
    }));
  } catch {
    return [];
  }
};

// 3. Extract videos
export const extractVideoData = async (data: any) => {
  const edges = data?.data?.title?.videoStrip?.edges || [];

  const videos = await Promise.all(
    edges.map(async (edge: any) => {
      const node = edge.node;

      return {
        id: node.id,
        name: node.name?.value,
        type: node.contentType?.displayName?.value,
        runtime: node.runtime?.value || 0,
        thumbnail: node.thumbnail?.url || "",
        urls: await getVideoUrls(node.id),
      };
    }),
  );

  return videos;
};

//  4. Pagination (main function)
export const getAllTitleVideos = async (
  titleId: string,
  limit = 10,
  typeFilter?: "trailer" | "clip" | "featurette",
) => {
  let results: any[] = [];
  let cursor: string | undefined = undefined;

  while (results.length < limit) {
    const data = await getTitleVideosPage(titleId, cursor, 50); // fetch bigger batch
    const edges = data?.data?.title?.videoStrip?.edges || [];

    for (const edge of edges) {
      const node = edge.node;

      const type = node.contentType?.displayName?.value?.toLowerCase() || "";
      const name = node.name?.value?.toLowerCase() || "";

      // apply filter BEFORE pushing
      const isMatch =
        !typeFilter || type.includes(typeFilter) || name.includes(typeFilter);

      if (!isMatch) continue;

      const urls = await getVideoUrls(node.id);

      results.push({
        id: node.id,
        name: node.name?.value,
        type: node.contentType?.displayName?.value,
        runtime: node.runtime?.value || 0,
        thumbnail: node.thumbnail?.url || "",
        urls,
      });

      // stop as soon as limit reached
      if (results.length >= limit) break;
    }

    const nextCursor = data?.data?.title?.videoStrip?.pageInfo?.endCursor;

    if (!nextCursor || edges.length === 0) break;

    cursor = nextCursor;
  }

  return results;
};
