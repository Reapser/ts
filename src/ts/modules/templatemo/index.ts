import initCarousel from './carousel';
import { skillsData, portfolioData } from './repo-data';

export function initTemplatemo(): void {
  initCarousel(portfolioData);
  // Additional functions such as initSkillsGrid, initParticles can be added and called here
}

initTemplatemo();
