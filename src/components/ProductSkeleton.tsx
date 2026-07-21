import Skeleton from "react-loading-skeleton";


export const ProductSkeleton: React.FC = () => {
  return (
   <div className="space-y-4">
  {/* Top actions skeleton */}
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-3">
      <Skeleton height={38} width={390} borderRadius={8} />
      <Skeleton height={38} width={145} borderRadius={8} />
    </div>

    <Skeleton height={38} width={140} borderRadius={8} />
  </div>


  {/* Table skeleton */}
  <div className="bg-white border border-slate-100 rounded-xl shadow-[0_1px_3px_0_rgba(0,0,0,0.02)] overflow-hidden">

    {/* Header */}
    <div className="grid grid-cols-6 px-6 py-5 border-b border-slate-100">
      {[
        "PRODUCT NAME",
        "CATEGORY",
        "PRICE",
        "QUANTITY",
        "STATUS",
        "ACTIONS",
      ].map((_, i) => (
        <Skeleton key={i} height={12} width="70%" />
      ))}
    </div>


    {/* Rows */}
    <div>
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className="grid grid-cols-6 items-center px-6 py-5 border-b border-slate-100"
        >

          {/* Product */}
          <div className="flex items-center gap-3">
            <Skeleton circle width={40} height={40} />

            <div className="flex-1">
              <Skeleton height={14} width="65%" />
            </div>
          </div>


          {/* Category */}
          <Skeleton height={14} width={20} />


          {/* Price */}
          <Skeleton height={14} width={90} />


          {/* Quantity */}
          <Skeleton height={14} width={30} />


          {/* Status */}
          <Skeleton height={24} width={90} borderRadius={999} />


          {/* Actions */}
          <div className="flex gap-4">
            <Skeleton height={18} width={18} />
            <Skeleton height={18} width={18} />
          </div>

        </div>
      ))}
    </div>


    {/* Footer */}
    <div className="flex items-center justify-between px-6 py-4">

      <Skeleton height={14} width={160} />

      <div className="flex gap-2">
        <Skeleton height={34} width={34} borderRadius={8} />
        <Skeleton height={34} width={34} borderRadius={8} />
        <Skeleton height={34} width={34} borderRadius={8} />
      </div>

    </div>

  </div>
</div>
  );
};