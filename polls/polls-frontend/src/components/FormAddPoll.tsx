import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { z } from "zod";
import Button from "../common/Button";

const newPollSchema = z.object({
  name: z.string().min(1, "Name is required"),
  options: z
    .string()
    .min(1, "Should have a name")
    .array()
    .min(2, "Should have min of 2 option"),
});

interface OptionDto {
  name: string;
}

type FormValues = z.infer<typeof newPollSchema>;

interface Props {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  fetchData: () => void;
}

function PollForm({ isOpen, setIsOpen, fetchData }: Props) {
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
  const { append, fields } = useFieldArray({ control, name: `options` });

  const onSubmit: SubmitHandler<FormValues> = (data: FormValues) => {
    const options = [] as OptionDto[];
    data.options.map((option) => {
      options.push({ name: option });
    });
    const dataNew = { ...data, options: options };
    axios.post("http://localhost:3000/polls", dataNew);
    fetchData();
    setClosed();
  };

  const setClosed = () => {
    setIsOpen(false);
  };

  return (
    <dialog
      className={`absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/4 p-4 border border-gray-400 ${!isOpen && "hidden"}`}
      open
    >
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
          <label className="flex flex-col border" key={index}>
            <p>Option {index + 1}</p>
            <input
              key={field.id}
              className="flex border-2 active:border-black p-2"
              {...register(`options.${index}`, { value: "" })}
            />
          </label>
        ))}

        <Button type="button" onClick={() => append({ option: "" })}>
          Add Option
        </Button>
        <section className="flex justify-between">
          <Button type="button" onClick={setClosed}>
            Cancel
          </Button>
          <Button type="submit">Save</Button>
        </section>
      </form>
    </dialog>
  );
}

export default PollForm;
