import type { EventModel } from '../types/EventModel';
import type { StandingsNodesModel } from '../types/StandingsNodesModel';
import PowerRankingAdapter from './PowerRankingAdapter';

const participatedInEvent = (playerId: number) => (standing: StandingsNodesModel) => {
  return standing.entrant.participants.some((participant) => participant.player.id === playerId);
};

const getParticipatedEvents = (playerId: number) => (events: EventModel[]) => {
  return events.filter(({ standings }) => standings.nodes.some(participatedInEvent(playerId)));
};

const getParticipatedStandingsNodes = (playerId: number) => (event: EventModel) => {
  return event.standings.nodes.filter((item) => item.entrant.participants.some((x) => x.player.id === playerId));
};

const getPlayerPlacement = (playerId: number) => (event: EventModel) => {
  const [playerStanding] = getParticipatedStandingsNodes(playerId)(event);
  return playerStanding.placement;
};

const toPowerRankingAdapterModel = (playerId: number) => (events: EventModel[]) => {
  const playedEvents = getParticipatedEvents(playerId)(events);

  return playedEvents.map((item) => {
    return {
      placement: getPlayerPlacement(playerId)(item),
      numOfEntrants: item.numEntrants,
    };
  });
};

const PlayerPowerRankingAdapter = (events: EventModel[], playerId: number) => {
  return PowerRankingAdapter(toPowerRankingAdapterModel(playerId)(events));
};

export default PlayerPowerRankingAdapter;
