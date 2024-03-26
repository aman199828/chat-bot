import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  selectAllQuestions,
  selectFifthQuestion,
  selectFourthQuestion,
  selectIsInputShow,
  selectIsLoading,
  selectIsQuestionShow,
  selectIsSuccess,
  selectPreviousChat,
  selectThirdQuestion,
  vacancyActions,
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
  const lastResultRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isLoading = useAppSelector(selectIsLoading);
  const isSuccess = useAppSelector(selectIsSuccess);
  const allQuestions = useAppSelector(selectAllQuestions);
  const isThirdQuestion = useAppSelector(selectThirdQuestion);
  const isFourthQuestion = useAppSelector(selectFourthQuestion);
  const isFifthQuestion = useAppSelector(selectFifthQuestion);
  const isQuestionShow = useAppSelector(selectIsQuestionShow);
  const isInputShow = useAppSelector(selectIsInputShow);
  const previousChatData = useAppSelector(selectPreviousChat);

  const dispatch = useAppDispatch();
  const handleQuestionClick = (selectedAnswer: string) => {
    if (selectedAnswer) {
      const question = {
        role: "user",
        content: selectedAnswer,
        date: new Date().toLocaleTimeString(),
      };
      dispatch(vacancyActions.updatePreviousChat(question));

      if (isFifthQuestion) {
        const payload = {
          email: "aman.dhiman@ensuesoft.com",
          traning: selectedAnswer,
        };
        dispatch(FifthQuestion(payload));
      } else if (isFourthQuestion) {
        const payload = {
          email: "aman.dhiman@ensuesoft.com",
          yearExp: selectedAnswer,
        };
        dispatch(FourthQuestion(payload));
      } else if (isThirdQuestion) {
        const payload = {
          email: "aman.dhiman@ensuesoft.com",
          selectedTech: selectedAnswer,
        };
        dispatch(ThirdQuestion(payload));
      } else {
        dispatch(FirstQuestion(selectedAnswer));
      }
    }
  };
  const handleScroll = () => {
    const prevChatData = document.getElementById("prevChatData");
    if (prevChatData) {
      prevChatData.scrollTo({
        top: lastResultRef.current?.offsetTop || 0,
        behavior: "smooth",
      });
    }
  };
  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        handleScroll();
      }, 1000);
    }
  }, [isSuccess, previousChatData]);
  return (
    <div>
      {isShowGptBox ? (
        <div
          className="chatbot-content"
          style={{ width: "30%", height: "100%" }}
        >
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
              className={`px-4 py-3 d-flex flex-column gap-4 h-60 ${
                previousChatData && previousChatData.length
                  ? "overflow-y-auto"
                  : ""
              }`}
              ref={messagesEndRef}
              id="prevChatData"
            >
              {previousChatData &&
                previousChatData.map((chatData, index) => {
                  const isUser = chatData.role !== "EnsuesoftBot";
                  const messageClass = isUser
                    ? "bg-gray p-3 rounded-userMsg"
                    : "bg-primary-subtle p-3 rounded-chatgpt";

                  return (
                    <React.Fragment key={index}>
                      <div className={isUser ? "w-75 ms-auto" : "w-75"}>
                        <div className={messageClass}>
                          <div className="d-flex align-items-center justify-content-between mb-1">
                            <h6 className="mb-0 fs-14 fw-bold">
                              {chatData.role}
                            </h6>
                            {chatData.role === "EnsuesoftBot" && (
                              <img
                                src={image}
                                alt="..."
                                className="copy-code chatbot"
                              />
                            )}
                          </div>
                          <p className="mb-0 fs-14 word-break">
                            {chatData.content}
                          </p>
                        </div>
                        <p
                          className="fs-12 text-end mt-1"
                          id="page-bottom"
                          ref={lastResultRef}
                        >
                          {chatData.date}
                        </p>
                      </div>
                    </React.Fragment>
                  );
                })}
              {isLoading ? (
                <div className="d-flex gap-2">
                  <div className="spinner-grow loading-spinner" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <div className="spinner-grow loading-spinner" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <div className="spinner-grow loading-spinner" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : (
                <div className="px-4 py-3 d-flex flex-column gap-4">
                  <div className="d-flex align-items-center justify-content-center px-4">
                    {!isInputShow && !isQuestionShow && (
                      <ul>
                        {allQuestions &&
                          allQuestions.map((question, index) => {
                            return (
                              <button
                                className="btn btn-primary my-1 w-100"
                                key={index}
                                onClick={() => handleQuestionClick(question)}
                              >
                                {question}
                              </button>
                            );
                          })}
                      </ul>
                    )}
                    {isInputShow && (
                      <>
                        <InputFields />
                      </>
                    )}
                  </div>
                </div>
              )}
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
