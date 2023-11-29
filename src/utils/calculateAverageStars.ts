import { Review } from "../type/Review";

export const calculateAverageStars = (reviews: Review[]): number => {
  if (reviews.length === 0) {
    return 0;
  }
  const totalStars = reviews.reduce(
    (acc, review) => acc + review.numberOfStars,
    0
  );
  const averageStars = totalStars / reviews.length;
  const roundedAverageStars = Math.round(averageStars);

  return roundedAverageStars;
};
