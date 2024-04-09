import { UseFormRegister } from "react-hook-form";
import { useAppSelector } from "../../redux/hooks";

import {
  selectInputType,
  selectPlaceholder,
} from "../../redux/reducers/vancencySlice";
import { IFormInput } from "../../models/chatBotModel";

interface registerType {
  register: UseFormRegister<IFormInput>;
}
export default function InputFields({ register }: registerType) {
  const inputType = useAppSelector(selectInputType);

  const placeholder = useAppSelector(selectPlaceholder);976
  return (
    <div className="form-row align-items-center">
      {inputType && inputType == "email" ? (
        <div className="form-row align-items-center p-3 col-10 mx-auto rounded-3 test-border">
          <div className="d-flex align-items-center justify-content-between gap-3">
            <input
              type={inputType}
              className="form-control w-75 border-0 shadow-none"
              id="inlineFormInputGroup"
              placeholder={placeholder && placeholder}
              {...register("email")}
            />
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      ) : inputType == "textArea" ? (
        <div className="form-row align-items-center p-3 col-10 mx-auto rounded-3 test-border">
          <div className="d-flex align-items-center justify-content-between gap-3">
            <textarea
              className="form-control w-75 border-0 shadow-none"
              style={{ resize: "none" }}
              id="exampleFormControlTextarea1"
              rows={5}
              placeholder={placeholder && placeholder}
              {...register("textArea")}
            ></textarea>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      ):( <div className="form-row align-items-center p-3 col-10 mx-auto rounded-3 test-border">
      <div className="d-flex align-items-center justify-content-between gap-3">
        
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
    </div>)}
    </div>
  );
}
