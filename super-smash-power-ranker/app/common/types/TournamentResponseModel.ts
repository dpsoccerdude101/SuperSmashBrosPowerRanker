import type { EventModel } from './EventModel';

export type TournamentResponseModel = {
  id: number;
  name: string;
  events: EventModel[];
};
