import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="h-96 flex justify-center items-center">
      <div className="flex flex-col gap-4 pt-40">
        <h1 className="text-4xl text-center">404</h1>
        <h2 className="text-2xl text-center">Page Not Found</h2>
        <p className="text-center">
          <Link href="/">Go back home</Link>
        </p>
      </div>
    </div>
  );
};

export default NotFoundPage;
