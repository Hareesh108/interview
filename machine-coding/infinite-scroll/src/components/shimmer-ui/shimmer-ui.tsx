export function ShimmerSkeleton() {
  return (
    <>
      {Array.from({ length: 25 }).map((_, index) => (
        <div
          key={index}
          className="border shadow-xs rounded-lg flex flex-col gap-2 animate-pulse"
        >
          <div className="p-3 overflow-clip">
            <div className="h-5 bg-gray-200 mb-1"></div>
            <div className="bg-gray-200"></div>
          </div>
          <div className="w-full flex justify-center pb-2 ">
            <div className="h-32 w-32 bg-gray-200 "></div>
          </div>
        </div>
      ))}
    </>

    //   <div
    //       key={index}
    //       className="mx-auto w-full max-w-sm rounded-md border border-blue-300 p-4"
    //     >
    //       <div className="flex animate-pulse space-x-4">
    //         <div className="size-10 rounded-full bg-gray-200"></div>
    //         <div className="flex-1 space-y-6 py-1">
    //           <div className="h-2 rounded bg-gray-200"></div>
    //           <div className="space-y-3">
    //             <div className="grid grid-cols-3 gap-4">
    //               <div className="col-span-2 h-2 rounded bg-gray-200"></div>
    //               <div className="col-span-1 h-2 rounded bg-gray-200"></div>
    //             </div>
    //             <div className="h-2 rounded bg-gray-200"></div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
  );
}
