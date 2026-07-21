import Skeleton from "react-loading-skeleton";


export const CategoriesSkeleton: React.FC = () => {
  return (
   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {[1, 2, 3, 4, 5, 6].map((i) => (
    <div
      key={i}
      className="bg-white p-6 border border-slate-100 rounded-xl shadow-[0_1px_3px_0_rgba(0,0,0,0.02)]"
    >

      {/* Icon */}
      <Skeleton
        width={48}
        height={48}
        borderRadius={12}
      />


      {/* Category info */}
      <div className="mt-5">
        <Skeleton height={18} width="45%" />

        <div className="mt-2">
          <Skeleton height={12} width="90%" />
        </div>
      </div>


      {/* Divider */}
      <div className="my-6">
        <Skeleton height={1} width="100%" />
      </div>


      {/* Stats */}
      <div className="space-y-3">

        <div className="flex justify-between items-center">
          <Skeleton height={12} width={100} />
          <Skeleton height={12} width={20} />
        </div>

        <div className="flex justify-between items-center">
          <Skeleton height={12} width={80} />
          <Skeleton height={12} width={30} />
        </div>

      </div>


      {/* Button */}
      <div className="mt-6">
        <Skeleton
          height={32}
          width="100%"
          borderRadius={8}
        />
      </div>

    </div>
  ))}
</div>
  );
};