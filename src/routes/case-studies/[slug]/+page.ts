import { error } from '@sveltejs/kit';
import projects from '$lib/data/projects.json' assert { type: 'json' };

export function load({ params }) {
    const project = projects.find((p) => p.slug === params.slug && p.caseStudy === true);

    if (!project) {
        throw error(404, 'Case study not found');
    }

    const caseStudies = projects.filter((p) => p.caseStudy === true);
    const currentIndex = caseStudies.findIndex((p) => p.slug === project.slug);

    const nextProject = caseStudies[(currentIndex + 1) % caseStudies.length];

    return {
        project,
        nextProject
    };
}