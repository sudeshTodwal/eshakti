import { OPEN_MENU_SIDEBAR, SET_CATEGORIES } from "../action.types";

export const appReducer = (state, action) => {
  switch (action.type) {
    case OPEN_MENU_SIDEBAR:
      return { ...state, menu_sidebar: action.payload };
      break;
    case SET_CATEGORIES:
      return { ...state, nav_links: action.payload };

    default:
      return state;
  }
};
