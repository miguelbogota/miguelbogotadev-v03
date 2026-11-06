import { API_URL } from './constants';

/** Removes the YAML frontmatter block from a project Markdown document. */
function removeFrontmatter(markdown: string): string {
  return markdown.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, '').trim();
}

/**
 * Fetches the long-form Markdown for a project that already exists in the
 * metadata index. Accepting a Project prevents arbitrary paths from being
 * requested before the project id has been validated by the application.
 */
export async function getProjectContent(project: Project): Promise<string | null> {
  try {
    const response = await fetch(`${API_URL}/projects/${encodeURIComponent(project.id)}.md`);

    if (!response.ok) return null;

    return removeFrontmatter(await response.text());
  } catch {
    return null;
  }
}
