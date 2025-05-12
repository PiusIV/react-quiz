function FinishScreen({ points, maxPossiblePoints, dispatch }) {
  const percentage = (points / maxPossiblePoints) * 100;

  return (
    <div>
      <p className="bg-blue-500 p-5 rounded-4xl">
        You scored <strong>{points}</strong> out of {maxPossiblePoints} (
        {Math.ceil(percentage)}%)
      </p>
      <div
        className="flex w-full"
        onClick={() => dispatch({ type: "restart" })}
      >
        <button className="hover:cursor-pointer hover:shadow-2xl bg-gray-800 border-2 rounded-4xl p-3 w-46 mx-auto">
          Restart Quiz
        </button>
      </div>
    </div>
  );
}

export default FinishScreen;
