const toWeightedPowerRanking = (powerRanking: number, numOfEntrants: number) => {
  return powerRanking + powerRanking * 0.05 * (numOfEntrants * 0.1);
};

const toPowerRanking = (placement: number) => {
  if (placement > 16) return 1;
  if (placement > 12) return 2;
  if (placement > 8) return 4;
  if (placement > 6) return 8;
  if (placement > 4) return 16;
  if (placement === 4) return 32;
  if (placement === 3) return 64;
  if (placement === 2) return 100;
  return 200;
};

const WeightedPowerRankingAdapter = ({ placement, numOfEntrants }: { placement: number; numOfEntrants: number }) => {
  const powerRanking = toPowerRanking(placement);
  return toWeightedPowerRanking(powerRanking, numOfEntrants);
};

export default WeightedPowerRankingAdapter;
