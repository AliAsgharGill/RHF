import { useForm } from "react-hook-form";

const FirstForm = () => {
  const form = useForm();

  const { register } = form;

  return (
    <>
      <form>
        <label htmlFor="name">Username</label>
        <input type="text" id="name" {...register("username")} />

        <label htmlFor="email">Email</label>
        <input type="email" id="email" {...register("email")} />

        <label htmlFor="">Channel</label>
        <input type="text" id="channel" {...register("channel")} />

        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default FirstForm;
