import { asyncForEach } from "../../helpers";
import instance from "../../app/request";
const IMX_DETAIL_URL = process.env.NEXT_PUBLIC_IMX_DETAIL_URL || "";

const _fetchMetaData = async (id: string) => {
  const { data } = await instance.get(`${IMX_DETAIL_URL}/${id}`);
  return data;
};

export function mergeImxAndMetaPiratesData(imxPiratesData, metaPiratesData) {
  if (!imxPiratesData || !metaPiratesData) {
    return [];
  }

  const merged = [];

  imxPiratesData.forEach((item) => {
    metaPiratesData.filter((meta) => {
      if (+item.token_id === +meta.token_id) {
        meta["_created_at"] = meta["_created_at"].toString();
        meta["_updated_at"] = meta["_updated_at"].toString();
        merged.push({ ...item, ...meta });
      }
    });
  });

  return merged;
}

export function filterPiratesBySearchQuery(searchPiratesQuery, pirates) {
  return pirates.filter((pirate) => {
    if (searchPiratesQuery === "") {
      return pirate;
    } else if (
      pirate.name?.toLowerCase().includes(searchPiratesQuery.toLowerCase())
    ) {
      return pirate;
    }
  });
}

export function filterItemsBySearchQuery(searchQuery, items) {
  return items.filter((item) => {
    if (searchQuery === "") {
      return item;
    } else if (
      (item?.name || item?.metadata?.name)
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase())
    ) {
      return item;
    }
  });
}

export async function fillItemsMetadata(items) {
  let parsed = [];

  await asyncForEach(items, async (item) => {
    if (item?.metadata === null) {
      const metadata = await _fetchMetaData(item?.token_id);
      return parsed.push({ ...item, metadata });
    }

    parsed.push({ ...item });
  });

  return parsed;
}
