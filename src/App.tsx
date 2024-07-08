import FirstForm from "./components/FirstForm";
import { MuiLoginForm } from "./components/MaterialUIIntegration";
import YupValidationForm from "./components/YupValidationForm";
import ZodValidationForm from "./components/ZodValidationForm";

function App() {
  return (
    <>
      {/* Horizontal line */}
      <div className="inline-flex items-center justify-center w-full">
        <hr className="w-64 h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
        <span className="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-900">
          React Hook Form
        </span>
      </div>
      <div>
        <h1>First Form with React Hook Form</h1>
        <FirstForm />
      </div>
      {/* Horizontal line */}
      <div className="inline-flex items-center justify-center w-full">
        <hr className="w-64 h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
        <span className="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-900">
          Yup
        </span>
      </div>

      <div>
        <h1>Yup Validation Form</h1>
        <YupValidationForm />
      </div>

      {/* Horizontal line */}
      <div className="inline-flex items-center justify-center w-full">
        <hr className="w-64 h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
        <span className="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-900">
          Zod
        </span>
      </div>

      <div className="">
        <h1>Zod Validation Form</h1>
        <ZodValidationForm />
      </div>
      {/* Horizontal line */}
      <div className="inline-flex items-center justify-center w-full">
        <hr className="w-64 h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
        <span className="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-900">
          MUI Login Form with Validation
        </span>
      </div>
      <div className="my-10" >
        <h1>MUI Login Form</h1>
        <MuiLoginForm />
      </div>
    </>
  );
}

export default App;
