import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

// here we create a variable, it will be updated on render
let renderCount = 0;

const FirstForm = () => {
  const form = useForm();

  const { register, control } = form;

  renderCount += 1;
  return (
    <>
      <div className="flex flex-col justify-center items-center p-4  space-x-4 space-y-4">
        <h1 className="text-black font-bold ">Form ({renderCount / 2})</h1>
        <form className=" bg-white shadow-md p-4 rounded ">
          <div className="flex justify-start  text-start flex-col">
            <label htmlFor="name">Username</label>
            <input
              type="text"
              id="name"
              className="border border-black rounded"
              {...register("username")}
            />
          </div>
          <div className="flex justify-start  text-start flex-col">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="border border-black rounded"
              {...register("email")}
            />
          </div>
          <div className="flex justify-start  text-start flex-col">
            <label htmlFor="">Channel</label>
            <input
              type="text"
              id="channel"
              className="border border-black rounded"
              {...register("channel")}
            />
          </div>

          <button
            type="submit"
            className="border bg-black font-bold text-white w-full my-2 rounded"
          >
            Submit
          </button>
        </form>
        <DevTool control={control} />
      </div>
    </>
  );
};

export default FirstForm;
