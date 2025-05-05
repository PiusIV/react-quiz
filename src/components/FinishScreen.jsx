function FinishScreen({ points, maxPossiblePoints }) {
  const percentage = (points / maxPossiblePoints) * 100;

  return (
    <p className="bg-blue-500 p-5 rounded-4xl">
      You scored <strong>{points}</strong> out of {maxPossiblePoints} (
      {Math.ceil(percentage)}%)
    </p>
  );
}

export default FinishScreen;
