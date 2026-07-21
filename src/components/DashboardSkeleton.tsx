import Skeleton from "react-loading-skeleton";


export const DashboardSkeleton: React.FC = () => {
  return (
    <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="bg-white p-6 border border-slate-100 rounded-xl shadow-[0_1px_3px_0_rgba(0,0,0,0.02)]">
                        <div className="flex items-center space-x-4">
                          <Skeleton circle width={48} height={48} />
                          <div className="flex-1">
                            <Skeleton height={12} width="60%" />
                            <Skeleton height={24} width="80%" style={{ marginTop: '8px' }} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Skeleton for content sections */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {[1, 2].map((i) => (
                      <div key={i} className="bg-white p-6 border border-slate-100 rounded-xl shadow-[0_1px_3px_0_rgba(0,0,0,0.02)]">
                        <Skeleton height={16} width="30%" style={{ marginBottom: '16px' }} />
                        <div className="space-y-4">
                          {[1, 2, 3].map((j) => (
                            <div key={j}>
                              <Skeleton height={12} width="100%" />
                              <Skeleton height={8} width="100%" style={{ marginTop: '8px' }} />
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
  );
};