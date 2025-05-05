function Progress({ index, numQuestions, points, maxPossiblePoints, answer }) {
  return (
    <>
      <progress
        value={index + Number(answer !== null)}
        max={numQuestions}
        className="
  w-full h-3 col-span-full appearance-none
  [&::-webkit-progress-bar]:bg-gray-300 [&::-webkit-progress-bar]:rounded-full
  [&::-webkit-progress-value]:bg-blue-500 [&::-webkit-progress-value]:rounded-full
"
      />
      <header className="flex justify-around gap-5 mb-5">
        <p>
          Question <strong>{index + 1} /</strong> {numQuestions}
        </p>
        <p>
          <strong>
            {points} / {maxPossiblePoints}
          </strong>
        </p>
      </header>
    </>
  );
}

export default Progress;
