import NotFound from "@/components/NotFound/NotFound";

export default async function NotFoundPage() {
  return (
    <>
      <div className="flex flex-col sm:bg-white min-h-screen">
        <NotFound />
      </div>
    </>
  );
}
