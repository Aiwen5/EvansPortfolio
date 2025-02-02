import type { PageLoad } from './$types.ts';
import projects from '$lib/data/projects.json' assert { type: 'json' };

export const load: PageLoad = ({ params }: { params: { slug: string } }) => {
  const slug = params.slug;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    throw new Error(`Project with slug "${slug}" not found`);
  }

  const currentIndex = projects.findIndex(p => p.slug === project.slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return {
    project,
    nextProject
  };
};