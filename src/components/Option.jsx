function Option({ question, answer, dispatch }) {
  const hasAnswered = answer !== null;
  return (
    <div className=" flex flex-col justify-center gap-7 w-full self-center px-9">
      {question.options.map((option, index) => (
        <button
          className={`p-2 self-center border-2 rounded-4xl border-gray-600 w-[16rem] bg-[#121212] cursor-pointer hover:text-black hover:font-bold transition-all
             ${index === answer ? "transform translate-x-6" : ""} ${
            hasAnswered
              ? index === question.correctOption
                ? "bg-green-600"
                : "bg-pink-500 border-pink-400"
              : ""
          }`}
          key={option}
          disabled={hasAnswered}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Option;
