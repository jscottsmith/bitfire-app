import {
  createContext,
  useReducer,
  useContext,
  Dispatch,
  PropsWithChildren,
} from "react";
import { INITIAL_COLORS } from "../constants";
import { ColorStop } from "../type";

type ColorState = { colorStops: ColorStop[] };

type ColorContextValue = {
  state: ColorState;
  dispatch: Dispatch<any>;
};

const initialState = {
  colorStops: INITIAL_COLORS,
};

const ColorsContext = createContext<ColorContextValue>({
  state: initialState,
  dispatch: () => {},
});

export enum ColorActions {
  "reset" = "reset",
  "update" = "update",
}

type Action = { type: keyof typeof ColorActions; payload: any };

export function resetColors() {
  return { type: ColorActions.reset };
}

export function updateColor(payload: { color: string; index: number }) {
  return { type: ColorActions.update, payload };
}

function colorsReducer(state: ColorState, action: Action): ColorState {
  switch (action.type) {
    case "reset":
      return initialState;
    case "update": {
      const newColors = state.colorStops.map((x, i) => {
        if (i === action.payload.index) {
          return { ...x, hex: action.payload.color };
        }
        return x;
      });

      return {
        ...state,
        colorStops: newColors,
      };
    }
    default:
      throw new Error("Unknown action");
  }
}

export function useColorsContext() {
  return useContext(ColorsContext);
}

export const ColorsProvider = (props: PropsWithChildren<{}>) => {
  const [state, dispatch] = useReducer(colorsReducer, initialState);
  const value: ColorContextValue = { state, dispatch };
  return (
    <ColorsContext.Provider value={value}>
      {props.children}
    </ColorsContext.Provider>
  );
};
