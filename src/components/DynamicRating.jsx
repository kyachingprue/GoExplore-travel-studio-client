import { Star, StarHalf, Star as StarOutline } from "lucide-react";

const DynamicRating = ({ rating }) => {
  const totalStars = 5;
  const numericRating = Number(rating) || 0;

  const stars = [];

  for (let i = 1; i <= totalStars; i++) {
    if (numericRating >= i) {
      // Full star
      stars.push(<Star key={i} size={14} className="text-yellow-400" />);
    } else if (numericRating >= i - 0.5) {
      // Half star
      stars.push(<StarHalf key={i} size={14} className="text-yellow-400" />);
    } else {
      // Empty star (outline)
      stars.push(<StarOutline key={i} size={14} className="text-gray-300" />);
    }
  }

  return <div className="flex items-center gap-1">{stars}{rating}</div>;
};

export default DynamicRating;
