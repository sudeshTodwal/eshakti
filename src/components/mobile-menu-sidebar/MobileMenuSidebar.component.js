import React, { useContext, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./mobileMenuSidebar.styles.scss";

import { Link } from "react-router-dom";
import { CgClose, CgMathMinus, CgMathPlus } from "react-icons/cg";
import { AppContext } from "../../context/context";
import { OPEN_MENU_SIDEBAR } from "../../context/action.types";

export default function MobileMenuSidebar() {
  const { appState, dispatchAppState } = useContext(AppContext);
  const [activeId, setActiveId] = useState(null);
  const categories = useSelector((state) => state.home.productCategory);

  return (
    <div className={`mobile-menu-sidebar appState ${appState.menu_sidebar}`}>
      <div className="close">
        <span
          onClick={() =>
            dispatchAppState({ type: OPEN_MENU_SIDEBAR, payload: "" })
          }
        >
          <CgClose />
        </span>
      </div>
      <div className="navlinks">
        <ul>
          {categories
            ? categories.length > 0
              ? categories.map((eachObj, key) => (
                  <div key={key}>
                    <Link
                      className="nav-link"
                      to={`/category-page/${eachObj.id}`}
                    >
                      <li className="uppercase">{eachObj.main_menu}</li>
                      {activeId === eachObj.id ? (
                        <CgMathMinus
                          className="rotate-in-2-cw"
                          onClick={() => setActiveId(null)}
                        ></CgMathMinus>
                      ) : (
                        <CgMathPlus
                          className="rotate-in-2-cw"
                          onClick={() => setActiveId(eachObj.id)}
                        ></CgMathPlus>
                      )}
                    </Link>
                    {activeId === eachObj.id ? (
                      <ul className="sub-menu swing-in-top-fwd">
                        {eachObj.sub_menu.map((subMenu, key) => (
                          <Link
                            key={key}
                            className="sub-link"
                            to={`/category-page/${subMenu.id}`}
                          >
                            <li id={subMenu.id}>{subMenu.name}</li>
                          </Link>
                        ))}
                      </ul>
                    ) : null}
                    <div className="seperator"></div>
                  </div>
                ))
              : null
            : null}
        </ul>
      </div>
    </div>
  );
}
