import React, {
  useState,
  useEffect,
  useCallback,
  createContext,
  useRef,
  useContext,
} from "react";
import { LiveDataSocket, LiveData, uuid } from "@live-data/core";

const LiveDataContext = createContext(null);

// could do some loading state?
export function LiveDataProvider(props) {
  const socketRef = useRef(new LiveDataSocket());

  return (
    <LiveDataContext.Provider value={socketRef}>
      {props.children}
    </LiveDataContext.Provider>
  );
}

export function useLiveDataSocket() {
  const socket = useContext(LiveDataContext);
  return socket.current;
}

// could also use some loading state
export function useLiveData(name, defaultState = {}, id = uuid()) {
  const socket = useLiveDataSocket();
  const [state, setState] = useState(defaultState);
  const handleDiff = useCallback((newState) => {
    setState({ ...newState });
  });

  const ldRef = useRef(
    new LiveData({
      name,
      id,
      socket,
      onDiff: handleDiff,
    })
  );

  useEffect(() => ldRef.current.connect(), [ldRef]);

  return [state, ldRef.current.push];
}
