import { getChapter, getAllChapters, getChapterVerseCount, type ChapterData } from "@/data/chapters";
import { getStaticVerse, getChapterVerses, type StaticVerse } from "@/data/verses";

export type { ChapterData, StaticVerse };

export function useStaticChapter(id: number): ChapterData | undefined {
  return getChapter(id);
}

export function useStaticAllChapters(): ChapterData[] {
  return getAllChapters();
}

export function useStaticVerse(chapterId: number, verseId: number): StaticVerse | undefined {
  return getStaticVerse(chapterId, verseId);
}

export function useStaticChapterVerses(chapterId: number): StaticVerse[] {
  return getChapterVerses(chapterId);
}

export function getPrevVerse(chapterId: number, verseId: number): number | null {
  if (verseId > 1) return verseId - 1;
  return null;
}

export function getNextVerse(chapterId: number, verseId: number): number | null {
  const total = getChapterVerseCount(chapterId);
  if (verseId < total) return verseId + 1;
  return null;
}

export { getChapterVerseCount };
