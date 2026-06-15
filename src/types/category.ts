// Category domain types. Must align with src/data/categories.json.

import type { AttractionCategoryId } from "./attraction";

export type Category = {
  id: AttractionCategoryId;
  label: string;
};
