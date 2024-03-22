<div>
  {isShowGptBox ? (
    <div className="chatbot-content" style={{ width: "30%" }}>
      <div className="w-100 bg-white border rounded-4">
        <div className="d-flex justify-content-between primary-bg rounded-4 rounded-bottom-0 py-3 px-4">
          <img src="../static/img/white-chatgpt.svg" alt="..." />
          <div data-bs-theme="dark">
            <button
              type="button"
              className="btn-close me-0 shadow-none opacity-100"
              id="chatbot-closeBtn"
              onClick={() => setIsShowGptBox(false)}
            ></button>
          </div>
        </div>
        <div
          className={`px-4 py-3 d-flex flex-column gap-4 ${
            previousChatData && previousChatData.length
              ? "overflow-y-scroll"
              : ""
          }`}
          style={{ height: "60vh" }}
          ref={messagesEndRef}
          id="prevChatData"
        >
          {previousChatData && previousChatData.length ? (
            previousChatData.map((chatData, index) => {
              const isUser = chatData.role !== "TheStrategist AI";
              const messageClass = isUser
                ? "bg-grey p-3 rounded-userMsg"
                : "bg-primary-subtle p-3 rounded-chatgpt";

              return (
                <React.Fragment key={index}>
                  <div className={isUser ? "w-75 ms-auto" : "w-75"}>
                    <div className={messageClass}>
                      <div className="d-flex align-items-center justify-content-between mb-1">
                        <h6 className="mb-0 fs-14 fw-bold">{chatData.role}</h6>
                        {chatData.role === "TheStrategist AI" && (
                          <img
                            src="../static/img/copy-code.svg"
                            alt="..."
                            className="copy-code"
                            onClick={() => handleCopy(chatData.content)}
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
            })
          ) : (
            <>
              <div
                className="d-flex align-items-center justify-content-center px-4"
                style={{ height: "60vh" }}
              >
                <div className="text-center">
                  <img
                    src="../static/img/chatgpt.svg"
                    alt="..."
                    className="img-fluid mb-3"
                  />
                  <h3 className="fw-bold">How can I help you today?</h3>
                </div>
              </div>
            </>
          )}
          {isLoading && (
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
          )}
        </div>

        {/* <div ref={lastResultRef}></div> */}
        <div className="border-0 px-4 py-2">
          <div className="mb-3 w-100 d-flex justify-content-between border rounded-4 border-black px-3 py-2">
            <input
              type="text"
              className="form-control shadow-none border-0 ps-0 fs-14"
              placeholder="Message ChatGPT...."
              value={value ? value : ""}
              onChange={(e) => setvalue(e.target.value)}
              // ref={buttonRef}
            />
            <button className="border-0" onClick={handleChatGpt}>
              <img src="../static/img/chatgpt-send.svg" alt="" />
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <button
      type="button"
      className="btn btn-primary rounded-circle p-3 chatbot shadow-none"
      id="scroll-to-bottom"
      onClick={() => setIsShowGptBox(!isShowGptBox)}
    >
      <img
        src="../static/img/chatbot-msgIcon.svg"
        alt="..."
        className="img-fluid"
      />
    </button>
  )}
</div>;
