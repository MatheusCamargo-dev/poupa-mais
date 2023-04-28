
export default function Loading() {
  return (
    <div className="h-full w-full">
      <div className=" mx-10 lg:mx-auto lg:container h-max my-10">
        <div className="flex flex-col rounded-md p-6 border-2 border-zinc-400 bg-gradient-dark-blue pb-32 lg:w-full">
          <h1 className="text-red-400 tracking-tight text-4xl font-semibold">
            Despesas
          </h1>
          <div className="flex text-white flex-col space-y-4 md:space-x-8 md:flex-row justify-between mt-5 ">
            <div
              className={`flex flex-col md:flex-row p-4 items-center border-2 w-full justify-center animate-pulse bg-skeleton border-zinc-300 text-center  text-transaction rounded-md`}
            >
              <span className={'text-xl md:text-2xl font-bold text-transaction'}>
              </span>
              <span className={'text-2xl px-1 md:text-4xl text-red-600 font-semibold'}>

              </span>
            </div>
          </div>
          <div className="flex sm:flex-row flex-col sm:space-x-8 mt-5">
            {/* form */}
            {/* <ExpenseItems></ExpenseItems> */}
            {Array.from([0, 1, 2]).map(() => <Skeleton key={crypto.randomUUID()}/>)}
          </div>
        </div>
      </div>
    </div>
  );
}
const Skeleton = () => {

  return(
    <div className="flex justify-between w-full p-3 px-5 border-2 border-zinc-500  rounded-2xl bg-skeleton animate-pulse">
      <div className="flex items-center space-x-8">

      </div>

    </div>
  )
}
