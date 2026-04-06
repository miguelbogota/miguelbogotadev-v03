/**
 * Filters work projects based on search query.
 * Searches across all project fields (name, industry, tags, summary, role, company, etc.).
 * Supports multi-token queries - ALL tokens must match at least one field each for the project
 * to be included.
 */
export function filterProjects(projects: Project[], query: string): Project[] {
  if (!query.trim()) {
    return projects;
  }

  // Split query into individual tokens and normalize each
  const tokens = query.toLowerCase().trim().split(/\s+/).filter(Boolean);

  return projects.filter((project) => {
    // Check if ALL tokens match AT LEAST ONE field each
    return tokens.every((rawToken) => {
      const token = rawToken.toLocaleLowerCase();
      const matchesId = project.id.toLowerCase().includes(token);
      const matchesDisplayName = project.displayName.toLowerCase().includes(token);
      const matchesIndustry = project.industry.toLowerCase().includes(token);
      const matchesTags = project.tags.some((tag) => tag.toLowerCase().includes(token));
      const matchesSummary = project.summary.toLowerCase().includes(token);
      const matchesRole = project.role.toLowerCase().includes(token);
      const matchesCompanyName = project.companyName.toLowerCase().includes(token);
      const matchesChallenge = project.challenge.description.toLowerCase().includes(token);
      const matchesSolution = project.solution.description.toLowerCase().includes(token);
      const matchesYear = project.startedAt.includes(token);

      return (
        matchesId ||
        matchesDisplayName ||
        matchesIndustry ||
        matchesTags ||
        matchesSummary ||
        matchesRole ||
        matchesCompanyName ||
        matchesChallenge ||
        matchesSolution ||
        matchesYear
      );
    });
  });
}
