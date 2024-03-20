import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  selectAllQuestions,
  selectAnswer,
  selectIsAllQuestionShow,
  selectIsInputShow,
  selectNextQuestion,
} from "../../redux/reducers/vancencySlice";
import { FirstQuestion } from "../../redux/thunks/vacancy";
import InputFields from "../Inputs";

function Bot() {
  const allQuestions = useAppSelector(selectAllQuestions);
  const allQuestionsShow = useAppSelector(selectIsAllQuestionShow);
  const allAnswer = useAppSelector(selectAnswer);
  const isInputShow = useAppSelector(selectIsInputShow);
  const nextQustion = useAppSelector(selectNextQuestion);
  const dispatch = useAppDispatch();
  const handleQuestionClick = (id: number) => {
    dispatch(FirstQuestion(id));
  };
  const handleAnswerClick = (question: string) => {
    console.log(question);
  };

  return (
    <div>
      {
        <div className="chatbot-content" style={{ width: "30%" }}>
          <div className="w-100 bg-white border rounded-4">
            <div className="d-flex justify-content-between primary-bg rounded-4 rounded-bottom-0 py-3 px-4">
              <img src="../static/img/white-chatgpt.svg" alt="..." />
              <div data-bs-theme="dark">
                <button
                  type="button"
                  className="btn-close me-0 shadow-none opacity-100"
                  id="chatbot-closeBtn"
                ></button>
              </div>
            </div>
            <div
              className={`px-4 py-3 d-flex flex-column gap-4 ${"overflow-y-scroll"}`}
              style={{ height: "60vh" }}
              //   ref={messagesEndRef}
              id="prevChatData"
            >
              <div
                className="d-flex align-items-center justify-content-center px-4"
                style={{ height: "60vh" }}
              >
                {!isInputShow && !allQuestionsShow && (
                  <ul>
                    {allQuestions &&
                      allQuestions.map((question) => {
                        return (
                          <button
                            key={question.id}
                            onClick={() => handleQuestionClick(question.id)}
                          >
                            {question.question}
                          </button>
                        );
                      })}
                  </ul>
                )}
                {nextQustion && nextQustion}
                {isInputShow && (
                  <>
                    <InputFields />
                  </>
                )}
                <ul>
                  {allAnswer &&
                    allAnswer.map((question, index) => {
                      return (
                        <button
                          key={index}
                          onClick={() => handleAnswerClick(question)}
                        >
                          {question}
                        </button>
                      );
                    })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  );
}

export default Bot;

// (
//     <button
//       type="button"
//       className="btn btn-primary rounded-circle p-3 chatbot shadow-none"
//       id="scroll-to-bottom"
//       //   onClick={() => setIsShowGptBox(!isShowGptBox)}
//     >
//       <img
//         src="../static/img/chatbot-msgIcon.svg"
//         alt="..."
//         className="img-fluid"
//       />
//     </button>
//   )
