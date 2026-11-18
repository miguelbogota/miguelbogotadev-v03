import { type Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { ProjectInfo } from '@/modules/project';
import { getCachedProject, getCachedProjects } from '@/modules/project/services/project.service';
import { seoService } from '@/modules/seo';
import { RequestError } from '@/modules/shared';

/** Dynamic project route parameters supplied by the App Router. */
type ProjectPageProps = {
  params: Promise<{ projectId: string }>;
};

/** Skips instant-navigation validation because `notFound` intentionally replaces this segment. */
export const instant = false;

/** Returns every currently published project path for build-time generation. */
export async function generateStaticParams() {
  const projects = await getCachedProjects();

  return projects.map(({ id }) => ({ projectId: id }));
}

/**
 * Builds project-specific search and social metadata from cached project information.
 *
 * @param props - Promise containing the project route identifier.
 * @returns Metadata for the matching project.
 */
export async function generateMetadata(props: ProjectPageProps): Promise<Metadata> {
  const { params } = props;
  const { projectId } = await params;
  const project = await resolveProject(projectId);

  return seoService.getProjectMetadata(project);
}

/**
 * Renders a canonical project shell while Markdown loads progressively in the browser.
 *
 * @param props - Promise containing the project route identifier.
 * @returns The project details page.
 */
export default async function ProjectPage(props: ProjectPageProps) {
  const { params } = props;
  const { projectId } = await params;
  const project = await resolveProject(projectId);

  return (
    <ProjectInfo
      project={project}
      manageDocumentTitle={false}
      backButton={
        <Link href="/" scroll={false} aria-label="Return to the portfolio">
          ←
        </Link>
      }
    />
  );
}

/**
 * Resolves a route project and converts missing IDs into a Next.js 404 response.
 *
 * @param projectId - Project identifier from the route.
 * @returns The cached project metadata.
 */
async function resolveProject(projectId: string) {
  try {
    return await getCachedProject(projectId);
  } catch (error) {
    if (error instanceof RequestError && error.code === 404) {
      notFound();
    }

    throw error;
  }
}
