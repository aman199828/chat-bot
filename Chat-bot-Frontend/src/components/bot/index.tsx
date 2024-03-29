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
  getAllQuestions,
  getStarted,
} from "../../redux/thunks/vacancy";
import InputFields from "../Inputs";
import image from "../../assets/chat-bot.png";
import image1 from "../../assets/ensuesoft-logo.svg";
import Loader from "../loader";

function Bot() {
  const [isShowGptBox, setIsShowGptBox] = useState(false);
  const [isStart, setIsStart] = useState(false);
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
  const [showLoaderMid, setShowLoaderMid] = useState(false);
  const [showContent, setshowContent] = useState(false);
  const [showMidLine, setShowMidLine] = useState(false);
  const [showEndLine, setShowEndLine] = useState(false);
  const [showloaderEnd, setShowLoadeEnd] = useState(false);

  useEffect(() => {
    if (isSuccess && !showContent) {
      const contentTimeout = setTimeout(() => {
        setshowContent(true);
        setShowLoaderMid(true);
      }, 3000);

      return () => clearTimeout(contentTimeout);
    }
  }, [isSuccess, showContent]);

  useEffect(() => {
    if (showContent && !showMidLine) {
      const midLineTimeout = setTimeout(() => {
        setShowMidLine(true);
        setShowLoadeEnd(true);
      }, 3000);

      return () => clearTimeout(midLineTimeout);
    }
  }, [showContent, showMidLine]);

  useEffect(() => {
    if (showMidLine && !showEndLine) {
      const endLineTimeout = setTimeout(() => {
        setShowEndLine(true);
      }, 3000);

      return () => clearTimeout(endLineTimeout);
    }
  }, [showMidLine, showEndLine]);

  const dispatch = useAppDispatch();
  const handleGetStart = () => {
    if (!isStart) {
      setIsStart(true);
      dispatch(getStarted());
    }
  };
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
        const payload = {
          selectedAnswer: selectedAnswer,
        };
        dispatch(FirstQuestion(payload));
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
  }, [isSuccess, previousChatData, showEndLine]);
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
              className={`spy-3 d-flex flex-column gap-4 h-60 ${
                previousChatData && previousChatData.length
                  ? "overflow-y-auto"
                  : ""
              }`}
              ref={messagesEndRef}
              id="prevChatData"
            >
              <div className="d-flex align-items-end gap-3 m-1">
                <img
                  src="../static/logo.svg"
                  alt="Logo"
                  style={{ width: "60px" }}
                />
                <div className="bg-primary-subtle p-3 rounded-chatgpt w-75 ">
                  <div className="d-flex align-items-center justify-content-between mb-1">
                    <h6 className="mb-0 fs-14 fw-bold">EnsuesoftBot</h6>
                    <img src={image} alt="..." className="copy-code chatbot" />
                  </div>
                  <p className="mb-0 fs-14 word-break text-start">
                    Welcome to Ensuesoft. The trusted development partner of
                    enterprises across the globe. Result-Oriented IT Services
                    for your Business. Trust our designers and developers for
                    tailor-made tech solutions.
                  </p>
                </div>
              </div>
              <div className="px-3 d-flex flex-column  align-items-end">
                <button
                  className={`btn  my-1 w-30 ${
                    isStart ? "btn-primary" : "btn-danger"
                  } `}
                  onClick={() => handleGetStart()}
                >
                  👋Click to Start
                </button>
              </div>
              {previousChatData &&
                previousChatData.map((chatData, index) => {
                  const isUser = chatData.role !== "EnsuesoftBot";
                  const messageClass = isUser
                    ? "bg-gray p-3 rounded-userMsg"
                    : "bg-primary-subtle p-3 rounded-chatgpt";

                  return (
                    <React.Fragment key={index}>
                      <div className="d-flex align-items-end gap-3 m-1">
                        {chatData.role === "EnsuesoftBot" && (
                          <img
                            src="../static/logo.svg"
                            alt="Logo"
                            style={{ width: "60px" }}
                          />
                        )}
                        <div
                          className={
                            isUser
                              ? "w-75 ms-auto text-end "
                              : "w-75 text-start"
                          }
                        >
                          {showContent ? (
                            <div className={messageClass}>
                              <div className="d-flex align-items-center justify-content-between mb-1">
                                <h6
                                  className={`mb-0 fs-14 fw-bold ${
                                    isUser ? "w-100 textend" : ""
                                  }`}
                                >
                                  {chatData.role}
                                </h6>
                              </div>
                              <p className="mb-0 fs-14 word-break ">
                                {chatData.content}
                              </p>
                            </div>
                          ) : (
                            <Loader />
                          )}

                          {showMidLine ? (
                            <div className={`${messageClass} mt-2`}>
                              <p className="mb-0 fs-14 word-break">
                                {chatData.midLine}
                              </p>
                            </div>
                          ) : (
                            showLoaderMid && <Loader />
                          )}
                          {showEndLine ? (
                            <div className={`${messageClass} mt-2`}>
                              <p className="mb-0 fs-14 word-break">
                                {chatData.endLine}
                              </p>
                            </div>
                          ) : (
                            showloaderEnd && <Loader />
                          )}
                          <p
                            className="fs-12 text-end mt-1"
                            id="page-bottom"
                            ref={lastResultRef}
                          >
                            {chatData.date}
                          </p>
                        </div>
                      </div>
                      {isInputShow && showEndLine && (
                        <>
                          <InputFields />
                        </>
                      )}
                    </React.Fragment>
                  );
                })}
              {isLoading ? (
                <Loader />
              ) : (
                <div className="py-3 d-flex flex-column gap-4 align-items-end">
                  <div className="d-flex align-items-center justify-content-center px-4">
                    {!isInputShow && !isQuestionShow && (
                      <ul className="d-flex flex-column">
                        {allQuestions &&
                          allQuestions.map((question, index) => {
                            return (
                              <button
                                className="btn btn-danger my-1 w-100 "
                                key={index}
                                onClick={() => handleQuestionClick(question)}
                              >
                                {question}
                              </button>
                            );
                          })}
                      </ul>
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
