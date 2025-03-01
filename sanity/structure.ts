import type { StructureResolver } from 'sanity/structure';
import { Rss, Code } from 'lucide-react'; // Import Lucide icons

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content Management')
    .items([
      S.listItem()
        .title('Posts')
        .icon(Rss) 
        .child(S.documentTypeList('post')),

      S.listItem()
        .title('Projects')
        .icon(Code) 
        .child(S.documentTypeList('project')),
        
      ...S.documentTypeListItems().filter(
        (listItem) => !['post', 'project'].includes(listItem.getId() ?? '')
      ), 

    ]);