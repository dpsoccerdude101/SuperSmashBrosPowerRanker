import type { StandingsNodesModel } from './StandingsNodesModel';

export type EventModel = {
  numEntrants: number;
  standings: {
    nodes: StandingsNodesModel[];
  };
};
