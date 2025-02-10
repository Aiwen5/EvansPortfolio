import type { PageLoad } from './$types.ts';
import projects from '$lib/data/projects.json' assert { type: 'json' };

export const load: PageLoad = ({ params }) => {
    const project = projects.find(p => p.slug === params.slug);
    
    if (!project) {
        throw new Error('Project not found');
    }

    // Find the next project in sequence
    const currentIndex = projects.findIndex(p => p.slug === project.slug);
    const nextProject = projects[(currentIndex + 1) % projects.length];

    return { project, nextProject };
};