import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Questions from "./components/Questions";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";
import FinishScreen from "./components/FinishScreen";

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "dataLoading":
      return { ...state, status: "loading" };
    case "start":
      return { ...state, status: "active" };
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finishedQuestions":
      return { ...state, status: "finish" };
    default:
      throw new Error("Action unknown");
  }
}

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { questions, status, index, answer, points } = state;

  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );

  useEffect(() => {
    async function getQuiz() {
      try {
        dispatch({ type: "dataLoading" });
        const res = await fetch("http://localhost:8000/questions");
        if (!res.ok) throw new Error("failed to fetch");

        const data = await res.json();
        console.log(data);
        dispatch({ type: "dataReceived", payload: data });
      } catch (err) {
        console.error(err.message);
        dispatch({ type: "dataError" });
      }
    }
    getQuiz();
  }, []);

  return (
    <div className="grid max-w-full h-screen mx-auto place-content-center py-12 bg-gray-900 text-white bg-cover">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              answer={answer}
            />
            <Questions
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <NextButton
              dispatch={dispatch}
              answer={answer}
              numQuestions={numQuestions}
              index={index}
            />
          </>
        )}
        {status === "finish" && (
          <FinishScreen points={points} maxPossiblePoints={maxPossiblePoints} />
        )}
      </Main>
    </div>
  );
}

export default App;
