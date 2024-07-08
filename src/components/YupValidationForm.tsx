import { DevTool } from "@hookform/devtools";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// writing yup schema
const schema = yup
  .object({
    username: yup
      .string()
      .required("Username is required")
      .min(3, "Username must be 3 characters long"),
    email: yup
      .string()
      .email("Email must be a valid email")
      .required("Email is required"),
    channel: yup
      .string()
      .required("Channel is required").min(3, "Channel must be 3 characters long")
      .max(15, "Channel must be 15 characters long"),
  })
  .required();

type FormValues = {
  username: string;
  email: string;
  channel: string;
};

const YupValidationForm = () => {
  const form = useForm<FormValues>({
    // validation mode
    mode: "onTouched",
    // static default values
    defaultValues: {
      username: "Ali",
      email: "",
      channel: "",
    },
    // validation schema for form fields using yup library
    resolver: yupResolver(schema),
  });

  const { register, control, handleSubmit, formState } = form;
  //  here we will get errors from formState and get some info from formState, like errors, touchedFields and dirtyFields, we can use this info to show errors on screen
  const { errors, isDirty, isValid } = formState;

  const onSubmit = (data: FormValues) => {
    console.log("Form submitted:", data);
  };

  return (
    <>
      <form
        noValidate
        //   to submit the form we use handleSubmit method assigned to the onSubmit event and passed in our submit function
        // reason to use handleSubmit is it can accept another argument onError
        onSubmit={handleSubmit(onSubmit)}
        className=" bg-white w-full  md:w-1/2  lg:w-1/3 shadow-md p-4 rounded "
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
                emailAvailable: async (fieldValue) => {
                  const response = await fetch(
                    `https://jsonplaceholder.typicode.com/users/?email=${fieldValue}`
                  );
                  const data = await response.json();
                  return data.length == 0 || "Email already taken";
                  // return fieldValue !== data.email || "Email already taken";
                },
              },
            })}
          />
          {/* In any error case of current field error message will shown because we get errors from formState */}
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

        {/* Here we make it disabled on the basis of isDirty and isValid values, and we get these values form formState */}
        {/* Submission Button  */}
        <button
          type="submit"
          // remove !isValid condition and make it disabled for now only
          disabled={!isDirty || !isDirty}
          className={`border ${
            isValid ? "bg-black" : "bg-gray-300"
          } font-bold text-white w-full my-2 p-2 rounded`}
        >
          {!isValid ? "Please Fill Form" : "Submit"}
        </button>
      </form>
      <DevTool control={control} />
    </>
  );
};

export default YupValidationForm;
