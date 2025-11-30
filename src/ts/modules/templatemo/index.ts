import initCarousel from './carousel.js';
import { portfolioData } from './repo-data.js';

export function initTemplatemo(): void {
  initCarousel(portfolioData);
  // Additional functions such as initSkillsGrid, initParticles can be added and called here
}

initTemplatemo();
