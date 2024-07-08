import {
  FieldError,
  FieldErrors,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useEffect } from "react";

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
  age: number;
  dob: Date;
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
      age: 0,
      dob: new Date(),
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

  const {
    register,
    control,
    handleSubmit,
    formState,
    watch,
    getValues,
    setValue,
  } = form;
  //  here we will get errors from formState and get shome info from formState, like errors, touchedFields and dirtyFields, we can use this info to show errors on screen
  const {
    errors,
    touchedFields,
    dirtyFields,
    isDirty,
    isValid,
    isSubmitting,
    isSubmitted,
    isSubmitSuccessful,
    submitCount,
  } = formState;
  console.log(
    //   "Touched Fields:",
    //   touchedFields,
    //   "Dirty Fields:",
    //   dirtyFields,
    //   "IsDirty:",
    //   isDirty
    "Is Submitting ",
    { isSubmitting },
    "Is Submitted ",
    { isSubmitted },
    "Is Submit Successful ",
    { isSubmitSuccessful },
    "Submit Count ",
    { submitCount }
  );

  const onSubmit = (data: FormValues) => {
    console.log("Form submitted:", data);
  };

  const onError = (errors: FieldErrors<FormValues>) => {
    console.log("Form errors:", errors);
  };

  const { fields, append, remove } = useFieldArray({
    name: "phNumbers",
    control,
  });

  // here below we wil watch from values single only username, then multiple username and email, and then whole form values, but need it will render form on every change. so we can also use useEffect with
  // we can use watch method to get the value of the input
  const watchUserName = watch("username");
  // here we will only watch two value username and email
  const watchUserNameAndEmail = watch(["username", "email"]);
  // here we will watch all values of form without specifying a field name and store it in a variable
  const formValues = watch();

  // here we will useEffect with watch method to get the value of the input and store it in a variable and these are actual subscriptions of the form values.
  useEffect(() => {
    const subscription = watch((value) => {
      console.log(value);
    });
    return () => subscription.unsubscribe();
  }, [watch, isSubmitSuccessful]);

  // why we used useEffect to render form on every change?
  // because we have used watch method to get the value of the input and store it in a variable formValues and it will render form on every change so we need to use useEffect to render form on every change and it will render form on every change.

  // here we are using getValues method from form, it will show values on click of the Get values button, we can a single property, multiple properties by defining in an array or whole form values without specifying a field name
  const handleGetValues = () => {
    console.log("Get Values:", getValues("social"));
  };

  // here we will use setValues method

  const handleSetValues = () => {
    // these both methods are used to set predefined values in the form
    // we can also check for validation, dirty and touch.
    setValue("username", "Sated Value ALI", {
      shouldDirty: true,
      shouldValidate: true,
      shouldTouch: true,
    });
    setValue("channel", "Sated Value Channel StylinAliVlogs", {
      shouldDirty: true,
      shouldValidate: true,
      shouldTouch: true,
    });
  };

  renderCount += 1;
  return (
    <>
      <div className="flex flex-col justify-center items-center p-4  space-x-4 space-y-4">
        {/* Here we can display the number of times the form has been rendered */}
        <h1 className="bg-white text-black font-bold ">
          Form rendered:({renderCount / 2}) times
        </h1>
        {/* Watching Username value */}
        <h2 className="bg-white">Watching username Value: {watchUserName}</h2>
        {/* Watching only username and email values */}
        <h2 className="bg-white">
          Watching Username and Email: {watchUserNameAndEmail}
        </h2>
        {/* Watching Form Values */}
        <h2 className="bg-white">
          Watching Form Values: {JSON.stringify(formValues)}
        </h2>

        <form
          noValidate
          //   to submit the form we use handleSubmit method assigned to the onSubmit event and passed in our submit function
          // reason to use handleSubmit is it can accept another argument onError
          onSubmit={handleSubmit(onSubmit, onError)}
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

          {/* twitter handle */}
          {/* we can use disabled from register method, if filed is disbaled it validation also get disabled and in ouptut its value will be undefined */}
          {/* here we will also disable this filed conditionally if it above filed  channel is not filled we can check it and make field disabled with any condition, */}
          {/* We can also set disable without any condition */}
          <div className="flex justify-start  text-start flex-col">
            <label htmlFor="">Twitter</label>
            <input
              type="text"
              id="twitter"
              placeholder="@MrBeast"
              className="border border-black rounded p-2"
              {...register("social.twitter", {
                // simple disabled
                // disabled:true,
                // conditional disabled
                disabled: watch("channel") === "",
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

          {/* <div className="flex justify-start  text-start flex-col">
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
          </div> */}

          {/* secondary phone number */}

          {/* <div className="flex justify-start  text-start flex-col">
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
          </div> */}

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
                      className="border border-black rounded p-2 w-full my-2"
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
          {/* by default number value goes in string format from browser, to send it as number need to use (valueAsNumber:true) in register object */}
          {/* numeric fields and Date values */}
          <div className="flex justify-start  text-start flex-col">
            <label htmlFor="">Age</label>
            <input
              type="number"
              id="age"
              placeholder="18"
              className="border border-black rounded p-2"
              {...register("age", {
                // here we make valueAsNumber true, and value will go in number type
                valueAsNumber: true,
                required: "Age Name Required",
              })}
            />
            <p className=" text-sm text-red-500">{errors.age?.message}</p>
          </div>

          {/* Date of birth */}
          <div className="flex justify-start  text-start flex-col">
            <label htmlFor="">Date of birth</label>
            <input
              type="date"
              id="dob"
              placeholder="18"
              className="border border-black rounded p-2"
              {...register("dob", {
                // here we make it valueAsDate true, and value will go in number type
                valueAsDate: true,
                required: "DOB is Required",
              })}
            />
            <p className=" text-sm text-red-500">{errors.dob?.message}</p>
          </div>

          {/* Here we make it disabled on the basis of isDirty and isValid values, and we get these values form formState */}
          {/* Submission Button  */}
          <button
            type="submit"
            disabled={!isDirty || !isValid || !isDirty || !isValid}
            className={`border ${
              isValid ? "bg-black" : "bg-gray-300"
            } font-bold text-white w-full my-2 p-2 rounded`}
          >
            {!isValid ? "Please Fill Form" : "Submit"}
          </button>
          {/* Get values button */}
          <button
            type="button"
            onClick={handleGetValues}
            className="border bg-black font-bold text-white w-full my-2 p-2 rounded"
          >
            Get Values
          </button>
          {/* Set values button */}
          <button
            type="button"
            onClick={handleSetValues}
            className="border bg-black font-bold text-white w-full my-2 p-2 rounded"
          >
            Set Values
          </button>
        </form>
        <DevTool control={control} />
      </div>
    </>
  );
};

export default FirstForm;
