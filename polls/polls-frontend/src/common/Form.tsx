import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { z } from "zod";
import Button from "./Button";

const newPollSchema = z.object({
  name: z.string().min(1, "Name is required"),
  options: z
    .string()
    .min(1, "Should have a name")
    .array()
    .min(2, "Should have min of 2 option"),
});

interface OptionDto {
  name: string
}

type FormValues = z.infer<typeof newPollSchema>;

function PollForm() {
  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
    resolver: zodResolver(newPollSchema),
    values: {
      name: "",
      options: ["", ""],
    },
  });
  const { append, fields } = useFieldArray({ control, name: "options" });

  const onSubmit: SubmitHandler<FormValues> = (data: FormValues) => {
    console.log(data);
    const options = [] as OptionDto[]
    data.options.map((option) => {
      options.push({name: option})
    })
    const dataNew = {...data, options: options};
    axios.post("http://localhost:3000/polls", dataNew);
  };

  return (
    <dialog className="" open>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="name"
          render={({ field }) => (
            <label className="flex flex-col border">
              <p>Name</p>
              <input
                className="flex border-2 active:border-black p-2"
                {...field}
              />
              {errors.name && (
                <p className="text-red-600 text-sm">{errors.name.message}</p>
              )}
            </label>
          )}
        />
        {fields.map((field, index) => (
          <label className="flex flex-col border p-2">
            <p>Options</p>
            <input key={field.id} {...register(`options.${index}`)} />
          </label>
        ))}

        <Button type="button" onClick={() => append({ option: '' })}>
          Add Option
        </Button>
        <section className="flex justify-between">
          <Button type="button">Cancel</Button>
          <Button type="submit">Save</Button>
        </section>
      </form>
    </dialog>
  );
}

export default PollForm;
