import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import axios from "axios";
import { IAction } from "../interface/action.interface";
import { IUser } from "../interface/user.interface";

export const useSocketAction = (userId: string) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [actions, setActions] = useState<IAction[]>([]);
  const [credits, setCredits] = useState<number[]>([0, 0, 0]);

  useEffect(() => {
    if (userId) {
      const newSocket = io();
      setSocket(newSocket);

      return () => {
        newSocket.disconnect();
      };
    }
  }, [userId]);

  useEffect(() => {
    if (socket) {
      socket.on("actionDeleted", () => {
        Promise.all([
          axios.get<IAction[]>("/action/" + userId),
          axios.get<IUser>("/user/" + userId),
        ])
          .then(([responseActions, responseCredits]) => {
            setActions(responseActions.data);
            setCredits([
              responseCredits.data.credits.A,
              responseCredits.data.credits.B,
              responseCredits.data.credits.C,
            ]);
          })
          .catch((error) => {
            console.error(error);
          });
      });
    }
  }, [socket, setActions, setCredits, userId]);

  return { socket, actions, setActions, credits, setCredits };
};
