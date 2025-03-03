"use client";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";

export default function AddressStep({ onSubmit }) {
  const t = useTranslations("checkout.addressStep");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto flex flex-col justify-between items-start container w-full gap-28"
    >
      <div className="space-y-4 w-full">
        <h2 className="text-2xl font-bold mb-4 uppercase">{t("title")}</h2>
        <div>
          <input
            {...register("city", { required: t("errors.cityRequired") })}
            placeholder={t("city")}
            className="p-2 border-b-2 bg-transparent text-lg w-full"
            required
          />
          {errors.city && (
            <span className="text-red-500">{errors.city.message}</span>
          )}
        </div>
        <div>
          <input
            placeholder={t("street")}
            {...register("street", { required: t("errors.streetRequired") })}
            className="p-2 border-b-2 bg-transparent text-lg w-full"
            required
          />
          {errors.street && (
            <span className="text-red-500">{errors.street.message}</span>
          )}
        </div>
        <div>
          <input
            {...register("building", {
              required: t("errors.buildingRequired"),
            })}
            className="p-2 border-b-2 bg-transparent text-lg w-full"
            required
            placeholder={t("building")}
          />
          {errors.building && (
            <span className="text-red-500">{errors.building.message}</span>
          )}
        </div>
      </div>
      <button
        type="submit"
        className="bg-customOrange text-white px-4 py-4 mt-8 rounded-3xl font-extrabold w-full"
      >
        {t("continue")}
      </button>
    </form>
  );
}
