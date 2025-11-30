import initCarousel from './carousel';
import { portfolioData } from './repo-data';
export function initTemplatemo() {
    initCarousel(portfolioData);
    // Additional functions such as initSkillsGrid, initParticles can be added and called here
}
initTemplatemo();
