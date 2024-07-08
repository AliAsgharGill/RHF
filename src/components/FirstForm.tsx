import { useFieldArray, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

// here we create a variable, it will be updated on render
let renderCount = 0;

type FormValues = {
  username: string;
  email: string;
  channel: string;
  social: {
    twitter: string;
    facebook: string;
  };
  phoneNumbers: string[];
  phNumbers: { number: string }[];
};

const FirstForm = () => {
  // we can give default values inside useForm Hook using key defaultValues, and default values will be shown if we give.

  //   we can also load previously saved as default values but need to make defaultVales function asynchronous
  const form = useForm<FormValues>({
    // static default values

    defaultValues: {
      username: "",
      email: "",
      channel: "",
      social: {
        twitter: "",
        facebook: "",
      },
      phoneNumbers: ["", ""],
      phNumbers: [{ number: "" }],
    },

    // default values from previous state or from api

    //   defaultValues: async () => {
    //     const response = await fetch(
    //       "https://jsonplaceholder.typicode.com/users/1"
    //     );
    //     const data = await response.json();
    //     return {
    //       username: data.username,
    //       email: data.email,
    //       channel: data.website,
    //     };
    //   },
  });

  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;
  const onSubmit = (data: FormValues) => {
    console.log("Form submitted:", data);
  };

  const { fields, append, remove } = useFieldArray({
    name: "phNumbers",
    control,
  });

  renderCount += 1;
  return (
    <>
      <div className="flex flex-col justify-center items-center p-4  space-x-4 space-y-4">
        <h1 className="text-black font-bold ">Form ({renderCount / 2})</h1>
        <form
          noValidate
          //   to submit the form we use handleSubmit method assigned to the onSubmit event and passed in our submit function
          onSubmit={handleSubmit(onSubmit)}
          className=" bg-white w-1/3 shadow-md p-4 rounded "
        >
          {/* username  */}
          <div className="flex justify-start  text-start flex-col">
            <label htmlFor="name">Username</label>
            <input
              type="text"
              id="name"
              placeholder="MrBeast"
              className="border border-black rounded p-2"
              // to register a field with RHF need to use ...register() method, it automatically track the field state

              // and for validation we can pass options to the register function

              {...register("username", {
                required: {
                  value: true,
                  message: "Username Required",
                },
              })}
            />
            <p className=" text-sm text-red-500">{errors.username?.message}</p>
          </div>
          {/* email */}
          <div className="flex justify-start  text-start flex-col">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="mrbeast@feastables.com"
              className="border border-black rounded p-2"
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
            <p className=" text-sm text-red-500">{errors.email?.message}</p>
          </div>

          {/* channel name */}
          <div className="flex justify-start  text-start flex-col">
            <label htmlFor="">Channel</label>
            <input
              type="text"
              id="channel"
              placeholder="MrBeast"
              className="border border-black rounded p-2"
              {...register("channel", { required: "Channel Name Required" })}
            />
            <p className=" text-sm text-red-500">{errors.channel?.message}</p>
          </div>

          {/* twitter handle */}
          <div className="flex justify-start  text-start flex-col">
            <label htmlFor="">Twitter</label>
            <input
              type="text"
              id="twitter"
              placeholder="@MrBeast"
              className="border border-black rounded p-2"
              {...register("social.twitter", {
                required: "Twitter Username Required",
              })}
            />
            <p className=" text-sm text-red`-500">
              {errors.social?.twitter?.message}
            </p>
          </div>

          {/* facebook handle  */}
          <div className="flex justify-start  text-start flex-col">
            <label htmlFor="">Facebook</label>
            <input
              type="text"
              id="facebook"
              placeholder="@MrBeast"
              className="border border-black rounded p-2"
              {...register("social.facebook", {
                required: "Facebook Username Required",
              })}
            />
            <p className=" text-sm text-red-500">
              {errors.social?.facebook?.message}
            </p>
          </div>

          {/* primary phone number */}
          <div className="flex justify-start  text-start flex-col">
            <label htmlFor="">Primary Phone Number</label>
            <input
              type="text"
              id="primary-phone-number"
              placeholder="+929384023242"
              className="border border-black rounded p-2"
              {...register("phoneNumbers.0", {
                required: "Primary Phone Number Required",
              })}
            />
            <p className=" text-sm text-red-500">
              {errors.phoneNumbers?.[0]?.message}
            </p>
          </div>

          {/* secondary phone number */}
          <div className="flex justify-start  text-start flex-col">
            <label htmlFor="">Secondary Phone Number</label>
            <input
              type="text"
              id="secondary-phone-number"
              placeholder="062850435"
              className="border border-black rounded p-2"
              {...register("phoneNumbers.1", {
                required: "Secondary Phone Number Required",
              })}
            />
            <p className=" text-sm text-red-500">
              {errors.phoneNumbers?.[1]?.message}
            </p>
          </div>
          {/* Dynamic list */}
          {/* To make dynamic filed need to import useFieldArray from rect-hook-form then add new field with an array of objects as values, destructure field append and remove from useFieldArray, and built the and then call these append and remove in callback, other values also have in  useFieldArray.  */}
          <div>
            <label htmlFor="">List of phone numbers</label>
            <div>
              {fields.map((field, index) => {
                return (
                  <div
                    className="form-control flex justify-between "
                    key={field.id}
                  >
                    <input
                      type="number"
                      className="border border-black rounded p-2 my-2"
                      {...register(`phNumbers.${index}.number` as const)}
                    />
                    {index > 0 && (
                      <button
                        type="button"
                        className="border bg-black font-bold text-white my-2 p-2 rounded"
                        onClick={() => remove(index)}
                      >
                        Remove{" "}
                      </button>
                    )}
                  </div>
                );
              })}
              <button
                type="button"
                className="border bg-black font-bold text-white w-full my-2 p-2 rounded"
                onClick={() => append({ number: "" })}
              >
                Add Phone Number
              </button>
            </div>
          </div>
          {/* Button  */}
          <button
            type="submit"
            className="border bg-black font-bold text-white w-full my-2 p-2 rounded"
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
