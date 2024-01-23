export const ProductItemSkeleton = () => {
  return (
    <div
      role="status"
      className="mb-3 flex animate-pulse items-center justify-center gap-x-3"
    >
      <div className="flex h-24 w-28 items-center justify-center rounded bg-gray-300  dark:bg-gray-300">
        <svg
          className="h-10 w-10 text-gray-200 dark:text-gray-400"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 18"
        >
          <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
        </svg>
      </div>
      <div className="flex h-full w-full flex-col justify-between py-2">
        <div className=" h-2.5 max-w-[250px] rounded-full bg-gray-200 dark:bg-gray-400"></div>
        <div className=" h-2 max-w-[100px] rounded-full bg-gray-200 dark:bg-gray-400"></div>
        <div className=" h-2 max-w-[100px] rounded-full bg-gray-200 dark:bg-gray-400"></div>
        <div className=" h-3 max-w-[150px] rounded-full bg-gray-200 dark:bg-gray-400"></div>
        <div className=" h-2 max-w-[100px] rounded-full bg-gray-200 dark:bg-gray-400"></div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};
