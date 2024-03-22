import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  selectAllQuestions,
  selectAnswer,
  selectFourthQuestion,
  selectIsAllQuestionShow,
  selectIsInputShow,
  selectNextQuestion,
  selectThirdQuestion,
} from "../../redux/reducers/vancencySlice";
import {
  FifthQuestion,
  FirstQuestion,
  FourthQuestion,
  ThirdQuestion,
} from "../../redux/thunks/vacancy";
import InputFields from "../Inputs";
import image from "../../assets/chat-bot.png";
import image1 from "../../assets/ensuesoft-logo.svg";
function Bot() {
  const [isShowGptBox, setIsShowGptBox] = useState(false);
  const allQuestions = useAppSelector(selectAllQuestions);
  const allQuestionsShow = useAppSelector(selectIsAllQuestionShow);
  const allAnswer = useAppSelector(selectAnswer);
  const isThirdQuestion = useAppSelector(selectThirdQuestion);
  const isFourthQuestion = useAppSelector(selectFourthQuestion);
  const isInputShow = useAppSelector(selectIsInputShow);
  const nextQustion = useAppSelector(selectNextQuestion);
  const dispatch = useAppDispatch();
  const handleQuestionClick = (id: number) => {
    dispatch(FirstQuestion(id));
  };
  const handleAnswerClick = (selectedAnswer: string) => {
    if (isFourthQuestion) {
      console.log(selectedAnswer);
      const payload = {
        email: "aman.dhiman@ensuesoft.com",
        traning: selectedAnswer,
      };
      dispatch(FifthQuestion(payload));
    } else if (isThirdQuestion) {
      const payload = {
        email: "aman.dhiman@ensuesoft.com",
        yearExp: selectedAnswer,
      };
      dispatch(FourthQuestion(payload));
    } else {
      const payload = {
        email: "aman.dhiman@ensuesoft.com",
        selectedTech: selectedAnswer,
      };
      dispatch(ThirdQuestion(payload));
    }
  };

  return (
    <div>
      {isShowGptBox ? (
        <div className="chatbot-content" style={{ width: "30%" }}>
          <div className="w-100 bg-white border rounded-4">
            <div className="d-flex justify-content-between primary-bg rounded-4 rounded-bottom-0 py-3 px-4">
              <img src={image1} alt="..." className="img-fluid logo-img" />
              <div>
                <button
                  type="button"
                  className="btn-close me-0  opacity-100"
                  id="chatbot-closeBtn"
                  onClick={() => setIsShowGptBox(false)}
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
                            className="btn btn-primary my-1 w-100"
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
      ) : (
        <button
          type="button"
          className="btn btn-primary rounded-circle  chatbot shadow-none "
          id="scroll-to-bottom"
          onClick={() => setIsShowGptBox(!isShowGptBox)}
        >
          <img src={image} alt="..." className="img-fluid " />
        </button>
      )}
    </div>
  );
}

export default Bot;
