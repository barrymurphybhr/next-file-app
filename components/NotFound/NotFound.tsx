export default function NotFound() {
  return (
    <section className="flex flex-col lg:bg-white bg-violet-50 h-screen">
      <div className="flex flex-col m-auto items-center">
        <span className="pointer-events-none absolute left-1/2 w-full -translate-x-1/2 -translate-y-1/2 text-center text-[10rem] font-bold tracking-tight text-gray-500 opacity-10 lg:text-[24rem]">
          404
        </span>
        <div className="flex flex-col items-center gap-8">
          <div className="flex flex-col items-center gap-14">
            <h1 className="text-3xl text-center font-semibold tracking-wide">
              This page isn&apos;t available
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}
