import { useForm, SubmitHandler } from "react-hook-form";
import { useAppDispatch } from "../../redux/hooks";
import { SecondQuestion } from "../../redux/thunks/vacancy";

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
      phoneNumber: data.phoneNumber,
    };
    dispatch(SecondQuestion(payload));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>First Name</label>
      <input {...register("email")} />
      <label>First Name</label>
      <input {...register("phoneNumber")} />
      <input type="submit" />
    </form>
  );
}
