import { Bookmark, BookmarkCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toggleSaved, useIsSaved } from "@/lib/saved";

export function SaveButton({ slug }: { slug: string }) {
  const saved = useIsSaved(slug);
  return (
    <Button
      type="button"
      variant={saved ? "default" : "outline"}
      onClick={() => toggleSaved(slug)}
      aria-pressed={saved}
    >
      {saved ? <BookmarkCheck /> : <Bookmark />}
      {saved ? "Saved" : "Save"}
    </Button>
  );
}
