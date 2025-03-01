import clsx from "clsx";

const CategoryCardSkeleton = ({ className }) => {
  return (
    <div
      className={clsx(
        "flex flex-col p-4 bg-white rounded-2xl shadow-md dark:bg-gray-800 dark:shadow-gray-700",
        "space-y-4 animate-pulse",
        className,
      )}
    >
      {/* Image Placeholder */}
      <div className="h-48 bg-slate-200 dark:bg-slate-700 rounded-2xl"></div>

      {/* Title Placeholder */}
      <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded-full"></div>

      {/* Description Placeholder */}
      <div className="space-y-2">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-4 bg-slate-200 dark:bg-slate-700 rounded"
          ></div>
        ))}
      </div>

      {/* Action Button Placeholder */}
      <div className="h-8 w-24 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
    </div>
  );
};

export default CategoryCardSkeleton;
