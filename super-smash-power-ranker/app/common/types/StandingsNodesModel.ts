import type { ParticipantModel } from './ParticipantModel';

export type StandingsNodesModel = {
  placement: number;
  entrant: {
    participants: ParticipantModel[];
  };
};
