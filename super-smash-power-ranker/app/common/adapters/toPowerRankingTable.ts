import { useMemo } from 'react';
import PlayerPowerRankingAdapter from './PlayerPowerRankingAdapter';
import type { EventModel } from '../types/EventModel';
import type { ParticipantModel } from '../types/ParticipantModel';
import type { StandingsNodesModel } from '../types/StandingsNodesModel';

type PlayerVMDTO = {
  gamerTag: string;
  id: number;
};

type PlayerWithPowerRankingVMDTO = PlayerVMDTO & {
  powerRanking: number;
  position: number;
};

const UniquePlayersAdapter = (players: PlayerVMDTO[]) => [...new Map(players.map((item) => [item.id, item])).values()];

const toPlayerVMDTO = ({ gamerTag, player: { id } }: ParticipantModel): PlayerVMDTO => ({ gamerTag, id });

const playerReducer = (accumulator: PlayerVMDTO[], currentValue: StandingsNodesModel) => {
  const players = currentValue.entrant.participants.map(toPlayerVMDTO);
  return [...accumulator, ...players];
};

const getAllPlayers = (events: EventModel[]) => {
  const totalPlayers = events.flatMap((event) => event.standings.nodes.reduce(playerReducer, [] as PlayerVMDTO[]));
  return UniquePlayersAdapter(totalPlayers);
};

const toPlayerPowerRankingModel =
  (player: PlayerVMDTO, position: number) =>
  (events: EventModel[]): PlayerWithPowerRankingVMDTO => {
    const powerRanking = PlayerPowerRankingAdapter(events, player.id);
    return { ...player, powerRanking: Number(powerRanking.toFixed(2)), position };
  };

const sortPlayerByPowerRanking = (players: PlayerWithPowerRankingVMDTO[]) => {
  const copy = [...players];
  copy.sort((itemA, itemB) => {
    if (itemA.powerRanking === itemB.powerRanking) return 0;
    return itemA.powerRanking > itemB.powerRanking ? -1 : 1;
  });
  return copy;
};

const toPowerRankingTable = (events: EventModel[]) => {
  const players = getAllPlayers(events);
  const playersWithPowerRankings = players.map((player, index) => toPlayerPowerRankingModel(player, index + 1)(events));
  return sortPlayerByPowerRanking(playersWithPowerRankings);
};

export default toPowerRankingTable;
