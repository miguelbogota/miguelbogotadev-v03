import type { Project } from '@/types/project';

function normalizeSearchText(text: string) {
  return text.toLowerCase().trim().replace(/\s+/g, ' ');
}

function getWorkProjectSearchText(project: Project) {
  const parts = [
    project.displayName,
    project.summary,
    project.tags.join(' '),
    project.role,
    project.companyName,
    project.industry,
    project.startedAt,
    project.links?.website,
    project.links?.github,
  ];

  return normalizeSearchText(parts.filter(Boolean).join(' '));
}

export function filterWorkProjects(projects: Project[], query: string) {
  const normalizedQuery = normalizeSearchText(query);
  if (!normalizedQuery) return projects;

  const tokens = normalizedQuery.split(' ').filter(Boolean);

  return projects.filter((project) => {
    const haystack = getWorkProjectSearchText(project);
    return tokens.every((token) => haystack.includes(token));
  });
}
