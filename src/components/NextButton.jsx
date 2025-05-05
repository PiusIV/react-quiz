function NextQuestion({ dispatch, answer, numQuestions, index }) {
  if (answer === null) return null;

  if (index < numQuestions - 1)
    //to remove the button at the last question
    return (
      <div
        className="flex w-full"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        <button className="hover:cursor-pointer hover:shadow-2xl bg-gray-800 border-2 rounded-4xl p-3 w-46 mx-auto">
          Next
        </button>
      </div>
    );

  if (index === numQuestions - 1)
    //to display finish screen
    return (
      <div
        className="flex w-full"
        onClick={() => dispatch({ type: "finishedQuestions" })}
      >
        <button className="hover:cursor-pointer hover:shadow-2xl bg-gray-800 border-2 rounded-4xl p-3 w-46 mx-auto">
          Finish
        </button>
      </div>
    );
}

export default NextQuestion;
