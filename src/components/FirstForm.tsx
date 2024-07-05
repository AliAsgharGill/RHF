import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

// here we create a variable, it will be updated on render
let renderCount = 0;

type FormValues = {
  username: string;
  email: string;
  channel: string;
};

const FirstForm = () => {
  const form = useForm<FormValues>();

  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;
  const onSubmit = (data: FormValues) => {
    console.log("Form submitted:", data);
  };

  renderCount += 1;
  return (
    <>
      <div className="flex flex-col justify-center items-center p-4  space-x-4 space-y-4">
        <h1 className="text-black font-bold ">Form ({renderCount / 2})</h1>
        <form
          noValidate
        //   to submit the form we use handleSubmit method assigned to the onSubmit event and passed in our submit function
          onSubmit={handleSubmit(onSubmit)}
          className=" bg-white shadow-md p-4 rounded "
        >
          <div className="flex justify-start  text-start flex-col">
            <label htmlFor="name">Username</label>
            <input
              type="text"
              id="name"
              className="border border-black rounded"
            // to register a field with RHF need to use ...register() method, it automatically track the field state

            // and for validation we can pass options to the register function

              {...register("username", {
                required: {
                  value: true,
                  message: "Username Required",
                },
              })}
            />
            <p className="my-1 text-sm text-red-500">
              {errors.username?.message}
            </p>
          </div>
          <div className="flex justify-start  text-start flex-col">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="border border-black rounded"
              {...register("email", {
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email format",
                },
                // we can do custom validation using the validate function
                validate: {
                  required: (fieldValue) => {
                    return fieldValue.trim() !== "" || "Email Address Required";
                  },
                  notAdmin: (fieldValue) => {
                    return (
                      fieldValue !== "admin@gmail.com" ||
                      "Enter a different email address"
                    );
                  },
                  notBlackListed: (fieldValue) => {
                    return (
                      !fieldValue.endsWith("baddomain.com") ||
                      "This domain is not supported"
                    );
                  },
                },
              })}
            />
            {/* In any error case of current field error message will shown becuase we get errors from formState */}
            <p className="my-1 text-sm text-red-500">{errors.email?.message}</p>
          </div>
          <div className="flex justify-start  text-start flex-col">
            <label htmlFor="">Channel</label>
            <input
              type="text"
              id="channel"
              className="border border-black rounded"
              {...register("channel", { required: "Channel Name Required" })}
            />
            <p className="my-1 text-sm text-red-500">
              {errors.channel?.message}
            </p>
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
