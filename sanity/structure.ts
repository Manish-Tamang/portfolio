import type { StructureResolver } from "sanity/structure";
import { Rss, Code, Image, Clock } from "lucide-react"; 

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content Management")
    .items([
      S.listItem().title("Posts").icon(Rss).child(S.documentTypeList("post")),

      S.listItem()
        .title("Projects")
        .icon(Code)
        .child(S.documentTypeList("project")),

      S.listItem()
        .title("Photos")
        .icon(Image) 
        .child(S.documentTypeList("photo")),

      S.listItem()
        .title("Timeline")
        .icon(Clock)
        .child(S.documentTypeList("timeline")),

      ...S.documentTypeListItems().filter(
        (listItem) =>
          !["post", "project", "photo", "timeline"].includes(
            listItem.getId() ?? ""
          )
      ),
    ]);
