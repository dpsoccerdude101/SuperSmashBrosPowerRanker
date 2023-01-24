import WeightedPowerRankingAdapter from './WeightedPowerRankingAdapter';

type PowerRankingAdapterModel = {
  placement: number;
  numOfEntrants: number;
};

const PowerRankingAdapter = (placements: PowerRankingAdapterModel[]) => {
  const weightedPowerRankings = placements.map(WeightedPowerRankingAdapter);
  return weightedPowerRankings.reduce((acc, curr) => acc + curr, 0);
};

export default PowerRankingAdapter;
