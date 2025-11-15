// Average reading speed in words per minute
const WORDS_PER_MINUTE = 200;

export interface Heading {
    level: number;
    text: string;
    slug: string;
}

/**
 * Calculates the estimated reading time for a given text.
 * @param text The text content to analyze.
 * @returns The estimated reading time in minutes, rounded up to the nearest whole number.
 */
export const calculateReadingTime = (text: string): number => {
  if (!text) {
    return 0;
  }
  // Count words by splitting by whitespace
  const wordCount = text.trim().split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / WORDS_PER_MINUTE);
  return readingTime;
};

/**
 * Creates a URL-friendly slug from a string.
 * @param text The string to slugify.
 * @returns A lowercased string with special characters removed and spaces replaced by hyphens.
 */
export const slugify = (text: string): string => {
    return text
        .toLowerCase()
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(/[^\w\-]+/g, '') // Remove all non-word chars
        .replace(/\-\-+/g, '-') // Replace multiple - with single -
        .replace(/^-+/, '') // Trim - from start of text
        .replace(/-+$/, ''); // Trim - from end of text
};


/**
 * Parses Markdown content to extract headings.
 * @param content The Markdown string.
 * @returns An array of Heading objects.
 */
export const parseHeadings = (content: string): Heading[] => {
    const headings: Heading[] = [];
    const lines = content.split('\n');
    
    lines.forEach(line => {
        if (line.startsWith('## ') || line.startsWith('### ')) {
            const level = line.startsWith('## ') ? 2 : 3;
            const text = line.substring(level + 1).trim();
            if (text) {
                headings.push({
                    level,
                    text,
                    slug: slugify(text)
                });
            }
        }
    });

    return headings;
};