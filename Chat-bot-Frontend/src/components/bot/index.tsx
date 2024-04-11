import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  selectAllQuestions,
  selectFifthQuestion,
  selectFirstQuestion,
  selectFourthQuestion,
  selectIsInputShow,
  selectIsLoading,
  selectIsQuestionShow,
  selectIsSuccess,
  selectLiveChatData,
  selectPreviousChat,
  selectSecondQuestion,
  selectThirdQuestion,
  vacancyActions,
} from "../../redux/reducers/vancencySlice";
import {
  FifthQuestion,
  FirstQuestion,
  FourthQuestion,
  SecondQuestion,
  ThirdQuestion,
  UserInfoQuestion,
  getStarted,
} from "../../redux/thunks/vacancy";
import InputFields from "../Inputs";
import image from "../../assets/chat-bot.png";
import image1 from "../../assets/ensuesoft-logo.svg";
import Loader from "../loader";
import { useForm, SubmitHandler } from "react-hook-form";
import { IFormInput } from "../../models/chatBotModel";
import { previousChatModel } from "../../models/vacancyModel";

function Bot() {
  const [isShowGptBox, setIsShowGptBox] = useState(false);
  const [isStart, setIsStart] = useState(false);
  const lastResultRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isLoading = useAppSelector(selectIsLoading);
  const isSuccess = useAppSelector(selectIsSuccess);
  const LiveChatData = useAppSelector(selectLiveChatData);
  const allQuestions = useAppSelector(selectAllQuestions);
  const isThirdQuestion = useAppSelector(selectThirdQuestion);
  const isFirstQuestion = useAppSelector(selectFirstQuestion);
  const isFourthQuestion = useAppSelector(selectFourthQuestion);
  const isSecondQuestion = useAppSelector(selectSecondQuestion);
  const isFifthQuestion = useAppSelector(selectFifthQuestion);
  const isQuestionShow = useAppSelector(selectIsQuestionShow);
  const isInputShow = useAppSelector(selectIsInputShow);
  const previousChatData = useAppSelector(selectPreviousChat);
  const [showLoaderMid, setShowLoaderMid] = useState(false);
  const [showContent, setshowContent] = useState(false);
  const [showContentLoader, setshowContentLoader] = useState(false);
  const [showMidLine, setShowMidLine] = useState(false);
  const [showEndLine, setShowEndLine] = useState(false);
  const [showloaderEnd, setShowLoaderEnd] = useState(false);
  const { register, handleSubmit, reset } = useForm<IFormInput>();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (isSuccess) {
      setshowContentLoader(true);
      const contentTimeout = setTimeout(() => {
        setshowContent(true);
      }, 2000);
      return () => clearTimeout(contentTimeout);
    }
  }, [isSuccess, LiveChatData.content]);
  useEffect(() => {
    if (showContent && LiveChatData.midLine) {
      setShowLoaderMid(true);
      const midLineTimeout = setTimeout(() => {
        setShowMidLine(true);
      }, 2000);

      return () => clearTimeout(midLineTimeout);
    }
  }, [showContent]);

  useEffect(() => {
    if (showMidLine && LiveChatData.endLine) {
      setShowLoaderEnd(true);
      const endLineTimeout = setTimeout(() => {
        setShowEndLine(true);
      }, 2000);
      return () => clearTimeout(endLineTimeout);
    }
  }, [showMidLine, LiveChatData.endLine]);

  const handleGetStart = () => {
    setshowContent(false);
    setShowMidLine(false);
    setShowEndLine(false);
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
      setshowContentLoader(false);
      setShowLoaderMid(false);
      setShowLoaderEnd(false);
      setshowContent(false);
      setShowMidLine(false);
      setShowEndLine(false);
      dispatch(vacancyActions.updatePreviousChat(question));
      if (isFirstQuestion) {
        const payload = {
          userEmail: "aman.dhiman@ensuesoft.com",
          selectedAnswer: selectedAnswer,
        };
        dispatch(FirstQuestion(payload));
      } else if (isSecondQuestion) {
        const payload = {
          userEmail: "aman.dhiman@ensuesoft.com",
          selectedAnswer: selectedAnswer,
        };
        dispatch(SecondQuestion(payload));
      } else if (isThirdQuestion) {
        const payload = {
          userEmail: "aman.dhiman@ensuesoft.com",
          selectedAnswer: selectedAnswer,
        };
        dispatch(ThirdQuestion(payload));
      } else {
        const payload = {
          userEmail: "aman.dhiman@ensuesoft.com",
          selectedAnswer: selectedAnswer,
        };
        dispatch(FourthQuestion(payload));
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
      handleScroll();
      reset({ email: "", textArea: "" });
    }
  }, [isSuccess, previousChatData, showContent, showMidLine, showEndLine]);

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    setshowContentLoader(false);
    setShowLoaderMid(false);
    setShowLoaderEnd(false);
    setshowContent(false);
    setShowMidLine(false);
    setShowEndLine(false);
    if (data.email) {
      const question = {
        role: "user",
        content: data.email,
        date: new Date().toLocaleTimeString(),
      };
      dispatch(vacancyActions.updatePreviousChat(question));
      const payload = {
        email: data.email,
      };
      dispatch(UserInfoQuestion(payload));
    } else if (isSecondQuestion) {
      const question = {
        role: "user",
        content: data.textArea,
        date: new Date().toLocaleTimeString(),
      };
      dispatch(vacancyActions.updatePreviousChat(question));
      const payload = {
        userEmail: "aman.dhiman@ensuesoft.com",
        selectedAnswer: data.textArea,
      };
      dispatch(SecondQuestion(payload));
    } else if (isThirdQuestion) {
      const question = {
        role: "user",
        content: data.textArea,
        date: new Date().toLocaleTimeString(),
      };
      dispatch(vacancyActions.updatePreviousChat(question));
      const payload = {
        userEmail: "aman.dhiman@ensuesoft.com",
        selectedAnswer: data.textArea,
      };
      dispatch(ThirdQuestion(payload));
    }
  };
  const filteredConversation = previousChatData.filter(
    (message: previousChatModel, index: number, arr) => {
      if (message.role === "EnsuesoftBot") {
        return index !== arr.length - 1;
      }
      return true;
    }
  );

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
                filteredConversation &&
                filteredConversation.map((chatData, index) => {
                  const isUser = chatData.role !== "EnsuesoftBot";
                  const messageClass = isUser
                    ? "bg-gray p-3 rounded-userMsg"
                    : "bg-primary-subtle p-3 rounded-chatgpt test";

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
                          {chatData && chatData.endLine ? (
                            <div className={`${messageClass} mt-2`}>
                              <p className="mb-0 fs-14 word-break">
                                {chatData.midLine}
                              </p>
                            </div>
                          ) : (
                            ""
                          )}
                          {chatData && chatData.endLine ? (
                            <div className={`${messageClass} mt-2`}>
                              <p className="mb-0 fs-14 word-break">
                                {chatData.endLine}
                              </p>
                            </div>
                          ) : (
                            ""
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
                    </React.Fragment>
                  );
                })}
              <div className="d-flex align-items-end gap-3 m-1">
                {LiveChatData.role === "EnsuesoftBot" && (
                  <img
                    src="../static/logo.svg"
                    alt="Logo"
                    style={{ width: "60px" }}
                  />
                )}
                <div className="w-75 text-start">
                  {showContent ? (
                    <div className="bg-primary-subtle p-3 rounded-chatgpt test">
                      <div className="d-flex align-items-center justify-content-between mb-1">
                        <h6 className="mb-0 fs-14 fw-bold ">
                          {LiveChatData.role}
                        </h6>
                      </div>
                      <p className="mb-0 fs-14 word-break ">
                        {LiveChatData.content}
                      </p>
                    </div>
                  ) : (
                    showContentLoader && <Loader />
                  )}
                  {LiveChatData && LiveChatData.midLine && showMidLine ? (
                    <div className="bg-primary-subtle p-3 rounded-chatgpt test mt-2">
                      <p className="mb-0 fs-14 word-break">
                        {LiveChatData.midLine}
                      </p>
                    </div>
                  ) : (
                    LiveChatData &&
                    LiveChatData.midLine &&
                    showLoaderMid && <Loader />
                  )}
                  {LiveChatData && LiveChatData.endLine && showEndLine ? (
                    <div className="bg-primary-subtle p-3 rounded-chatgpt test mt-2">
                      <p className="mb-0 fs-14 word-break">
                        {LiveChatData.endLine}
                      </p>
                    </div>
                  ) : (
                    LiveChatData &&
                    LiveChatData.endLine &&
                    showloaderEnd && <Loader />
                  )}
                  <p
                    className="fs-12 text-end mt-1"
                    id="page-bottom"
                    ref={lastResultRef}
                  >
                    {LiveChatData.date}
                  </p>
                </div>
              </div>
              {isInputShow && showContent && showMidLine && showEndLine && (
                <form onSubmit={handleSubmit(onSubmit)}>
                  <InputFields register={register} />
                </form>
              )}

              {isInputShow && showContent && showMidLine && !showEndLine && (
                <form onSubmit={handleSubmit(onSubmit)}>
                  <InputFields register={register} />
                </form>
              )}

              {isInputShow && showContent && !showMidLine && !showEndLine && (
                <form onSubmit={handleSubmit(onSubmit)}>
                  <InputFields register={register} />
                </form>
              )}
              {!isInputShow && !isQuestionShow && showContent && (
                <div className="py-3 d-flex flex-column gap-4 align-items-end">
                  <div className="d-flex align-items-center justify-content-center px-4">
                    <ul className="d-flex flex-column">
                      {allQuestions &&
                        allQuestions.length > 0 &&
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
