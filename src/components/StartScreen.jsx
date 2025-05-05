function StartScreen({ numQuestions, dispatch }) {
  return (
    <div className="capitalize flex flex-col text-center gap-8 ">
      <h1>welcome to your react quiz</h1>
      <h3 className="italic font-mini">
        {numQuestions} questions to test your react knowledge
      </h3>
      <button
        className="hover:cursor-pointer bg-gray-900 border-2 rounded-4xl p-3 w-46 mx-auto"
        onClick={() => dispatch({ type: "start" })}
      >
        let's start
      </button>
    </div>
  );
}

export default StartScreen;
