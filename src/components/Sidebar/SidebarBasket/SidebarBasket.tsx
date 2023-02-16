import s from "./SidebarBasket.module.scss";
import basketBottom from "img/basketBottom.svg";
import basketTop from "img/basketTop.svg";
import { memo, useEffect, useState } from "react";
import clsx from "clsx";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { setBacketState } from "redux/slices/controlSlice";

function SidebarBasket() {
  const dispatch = useAppDispatch();
  const [show, setShow] = useState(false);
  const [rotate, setRotate] = useState(false);
  const backetState = useAppSelector((state) => state.control.backetState);

  const rotateHandler = () => {
    setRotate(!rotate);
  };

  const showHandler = () => {
    setShow(!rotate);
  };

  useEffect(() => {
    showHandler();
    const timer = setTimeout(rotateHandler, 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!!backetState.isCancel) {
      hideBasketHandler();
    }
  }, [backetState.isCancel]);

  useEffect(() => {
    if (!!backetState.isConfirm) {
      const timer = setTimeout(hideBasketHandler, 500);
      return () => clearTimeout(timer);
    }
  }, [backetState.isConfirm]);

  const hideBasketHandler = () => {
    rotateHandler();
    const timer = setTimeout(showHandler, 400);
    const timer2 = setTimeout(
      () =>
        dispatch(
          setBacketState({ isShow: false, isConfirm: false, isCancel: false })
        ),
      800
    );
    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
    };
  };

  return (
    <>
      <img
        className={clsx(s.basketTop, show && s.show, rotate && s.rotate)}
        src={basketTop}
        alt="basket"
      />
      <img
        className={clsx(s.basketBottom, show && s.show)}
        src={basketBottom}
        alt="basket"
      />
    </>
  );
}

export default memo(SidebarBasket);
