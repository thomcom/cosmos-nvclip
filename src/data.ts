import { performances } from "./performances";

export type Node = {
  id: string;
  color: string;
};

export type Link = {
  source: string;
  target: string;
};

export const nodes: Node[] = Array.from(
  new Set([
    ...performances.map((p) => `P:${p.performanceTitle}`),
    ...performances.map((p) => p.theaterName)
  ])
).map((id) => ({
  id,
  color: id.indexOf("P:") === 0 ? "#4B5BBF" : "#ED69B4"
}));

export const links: Link[] = performances.map((p) => ({
  source: p.theaterName,
  target: `P:${p.performanceTitle}`
}));
