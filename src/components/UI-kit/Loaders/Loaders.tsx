import { useAppSelector } from "hooks/redux";
import s from "./Loaders.module.scss";

function PagesLoader() {
  const loader = useAppSelector((state) => state.messages.showLoader);

  console.log(loader);

  return (
    <>
      {loader === "pagesLoader" && (
        <div className={s.pagesLoaderBox}>
          <div className={s.loaderPages} />
        </div>
      )}
    </>
  );
}

export default PagesLoader;
