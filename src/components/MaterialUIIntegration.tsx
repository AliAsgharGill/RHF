import { TextField, Button, Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
type FormValues = {
  email: string;
  password: string;
};

export const MuiLoginForm = () => {
  const form = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { register, handleSubmit, formState, control } = form;

  const { errors } = formState;

  const onSubmit = (data: FormValues) => {
    console.log("Form submitted:", data);
  };
  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField
          label="Email"
          variant="outlined"
          type="email"
          {...register("email", {
            required: "Email is required",
            min: 6,
            max: 12,
          })}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          {...register("password", {
            required: "Password is required",
          })}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <Button variant="contained" type="submit" color="primary">
          Login
        </Button>
      </form>
      <DevTool control={control} />
    </>
  );
};
