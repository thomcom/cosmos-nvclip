import { Graph, GraphConfigInterface } from "@cosmograph/cosmos";

import { nodes, links, Node, Link } from "./data";
import { CosmosLabels } from "./labels";

import "./styles.css";

const canvas = document.querySelector("canvas") as HTMLCanvasElement;
const div = document.querySelector("#labels") as HTMLDivElement;

const cosmosLabels = new CosmosLabels<Node, Link>(div);
const nodesToShowLabelsFor = [
  "Drury Lane Theatre",
  "King's Theatre",
  "Lincoln's Inn Fields",
  "Goodman's Fields",
  "Haymarket Theatre",
  "Covent Garden",
  "Bartholomew Fair",
  "Southwark Fair",
  "Pantheon, Oxford Street"
];

let graph: Graph<Node, Link>;
export const config: GraphConfigInterface<Node, Link> = {
  backgroundColor: "#151515",
  nodeSize: (n) => (nodesToShowLabelsFor.includes(n.id) ? 8 : 2),
  nodeColor: (n) => n.color,
  nodeGreyoutOpacity: 0.1,
  linkWidth: 0.1,
  linkColor: "#5F74C2",
  linkArrows: false,
  linkGreyoutOpacity: 0,
  simulation: {
    gravity: 0.1,
    linkDistance: 1,
    linkSpring: 0.3,
    repulsion: 0.4,
    onTick: () => cosmosLabels.update(graph)
  },
  events: {
    onZoom: () => cosmosLabels.update(graph)
  }
};

graph = new Graph(canvas, config);
graph.setData(nodes, links);
graph.setZoomLevel(0.6);

// _Track the nodes_ for which you wish to display labels.
// Their coordinates in the simulation space will be accessible
// via the `getTrackedNodePositionsMap` method. You can then convert
// them to the screen space with the `spaceToScreenPosition`
// method.
graph.trackNodePositionsByIds(nodesToShowLabelsFor);
