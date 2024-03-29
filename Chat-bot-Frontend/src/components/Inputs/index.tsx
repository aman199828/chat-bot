import { useForm, SubmitHandler } from "react-hook-form";
import { useAppDispatch } from "../../redux/hooks";
import { UserInfoQuestion } from "../../redux/thunks/vacancy";

interface IFormInput {
  email: string;
  phoneNumber: Number;
}

export default function InputFields() {
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const payload = {
      email: data.email,
    };
    dispatch(UserInfoQuestion(payload));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-row align-items-center">
        <div className="col-auto">
          <label className="sr-only" htmlFor="inlineFormInputGroup">
            Email
          </label>
          <div className="input-group mb-2">
            <div className="input-group-prepend">
              <div className="input-group-text">@</div>
            </div>
            <input
              type="text"
              className="form-control"
              id="inlineFormInputGroup"
              placeholder="Username"
              {...register("email")}
            />
          </div>
        </div>
        <div className="col-auto">
          <button type="submit" className="btn btn-primary mb-2">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}
