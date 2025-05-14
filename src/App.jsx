import { useReducer } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
// import Loader from "./components/Loader";
// import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Questions from "./components/Questions";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";
import FinishScreen from "./components/FinishScreen";
import quizQuestions from "../public/quizQuestions";
import Footer from "./components/Footer";
import Timer from "./components/Timer";

const initialState = {
  questions: quizQuestions,
  status: "ready",
  index: 0,
  answer: null,
  points: 0,
  secondsRemaining: null,
};

const SECS_PER_QUESTION = 20;

function reducer(state, action) {
  switch (action.type) {
    // case "dataFailed":
    //   return { ...state, status: "error" };
    // case "dataLoading":
    //   return { ...state, status: "loading" };
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case "newAnswer": {
      const question = state.questions.at(state.index);

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    }
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finishedQuestions":
      return { ...state, status: "finish" };
    case "restart":
      return { ...initialState, questions: state.questions, status: "ready" };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finish" : state.status,
      };
    default:
      throw new Error("Action unknown");
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { questions, status, index, answer, points, secondsRemaining } = state;

  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );

  // ! Removed cos server isn't working in production
  // useEffect(() => {
  //   async function getQuiz() {
  //     try {
  //       dispatch({ type: "dataLoading" });
  //       const res = await fetch("http://localhost:8000/questions");
  //       if (!res.ok) throw new Error("failed to fetch");

  //       const data = await res.json();
  //       console.log(data);
  //       dispatch({ type: "dataReceived", payload: data });
  //     } catch (err) {
  //       console.error(err.message);
  //       dispatch({ type: "dataError" });
  //     }
  //   }
  //   getQuiz();
  // }, []);

  return (
    <div className="grid max-w-full h-screen mx-auto place-content-center py-12 bg-gray-900 text-white bg-cover">
      <Header />
      <Main>
        {/* {status === "loading" && <Loader />}
        {status === "error" && <Error />} */}
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
            <Footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                numQuestions={numQuestions}
                index={index}
              />
            </Footer>
          </>
        )}
        {status === "finish" && (
          <FinishScreen
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
