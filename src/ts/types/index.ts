export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export type PortfolioItem = {
  id: number;
  title: string;
  description: string;
  image: string;
  tech: string[];
};

export type Skill = {
  name: string;
  icon: string;
  level: number;
  category: string;
};
