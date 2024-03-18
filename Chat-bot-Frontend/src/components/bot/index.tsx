import { useAppSelector } from "../../redux/hooks";
import { selectAllQuestions } from "../../redux/reducers/vancencySlice";

function Bot() {
  const allQuestions = useAppSelector(selectAllQuestions);
  const handleQuestionClick = (id: number) => {
    console.log(id);
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
              </div>
            </div>

            {/* <div ref={lastResultRef}></div> */}
            {/* <div className="border-0 px-4 py-2">
              <div className="mb-3 w-100 d-flex justify-content-between border rounded-4 border-black px-3 py-2">
                <input
                  type="text"
                  className="form-control shadow-none border-0 ps-0 fs-14"
                  placeholder="Message ChatGPT...."
                  value={""}
                  //   onChange={(e) => setvalue(e.target.value)}
                  // ref={buttonRef}
                />
                <button className="border-0">
                  <img src="../static/img/chatgpt-send.svg" alt="" />
                </button>
              </div>
            </div> */}
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
