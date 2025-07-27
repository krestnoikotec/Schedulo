import React from "react";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { AddTaskProps, FormValues } from "@/Types/Types";
import { Controller, useForm } from "react-hook-form";
import styles from "./addTaskComponent.module.scss";
import Input from "@/Components/Input/Input";
import Button from "@/Components/Button/Button";
import TaskPriority from "@/Components/TaskPriority/TaskPriority";

const AddTaskComponent = ({ onSubmit }: AddTaskProps) => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      title: "",
      description: "",
      dateStart: "",
      dateEnd: "",
      priority: 0,
    },
  });

  const watchDateStart = watch("dateStart");
  const watchDateEnd = watch("dateEnd");

  const handleFormSubmit = (data: FormValues) => {
    onSubmit(data);
    reset();
  };

  const handleKeyEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const form = e.currentTarget.form;
      if (form) {
        form.requestSubmit();
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className={styles.inputForm}
    >
      <Input
        type={"text"}
        placeholder={"Enter Name..."}
        {...register("title", {
          required: "Title is required",
          minLength: {
            value: 3,
            message: "Title must be at least 3 characters",
          },
        })}
        name="title"
      >
        Task Name:
      </Input>
      {errors.title && (
        <p className={styles.errorMessage}>{errors.title.message}</p>
      )}
      <Input
        type={"text"}
        placeholder={"Enter Description..."}
        {...register("description")}
        name={"description"}
      >
        Task Description:
      </Input>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <div>
          <div>
            <Controller
              name="dateStart"
              control={control}
              rules={{ required: "Start date is required" }}
              render={({ field }) => (
                <DateTimePicker
                  slotProps={{
                    textField: {
                      className: styles.dateInput,
                    },
                    popper: {
                      className: styles.datePopper,
                    },
                  }}
                  label="Start Date:"
                  value={field.value ? new Date(field.value) : null}
                  onChange={(date) =>
                    field.onChange(date ? date.toISOString() : "")
                  }
                  maxDateTime={
                    watchDateEnd ? new Date(watchDateEnd) : undefined
                  }
                  ampm={false}
                />
              )}
            />
            {errors.dateStart && (
              <p className={styles.errorMesage}>{errors.dateStart.message}</p>
            )}
          </div>
          <div>
            <Controller
              name="dateEnd"
              control={control}
              rules={{ required: "End date is required" }}
              render={({ field }) => (
                <DateTimePicker
                  label="End Date:"
                  value={field.value ? new Date(field.value) : null}
                  onChange={(date) =>
                    field.onChange(date ? date.toISOString() : "")
                  }
                  minDateTime={
                    watchDateStart ? new Date(watchDateStart) : undefined
                  }
                  ampm={false}
                />
              )}
            />
            {errors.dateEnd && (
              <p className={styles.errorMesage}>{errors.dateEnd.message}</p>
            )}
          </div>
        </div>
      </LocalizationProvider>
      <Controller
        name="priority"
        control={control}
        render={({ field }) => (
          <TaskPriority value={field.value} onChange={field.onChange} />
        )}
      />
      <Button type="submit">Add Task</Button>
    </form>
  );
};

export default AddTaskComponent;
