import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import * as SignalR from '@microsoft/signalr';
import { API_BASE_URL } from '../env';
import { registerForPushNotificationsAsync, scheduleNotification } from '../notificationHelper';
import { AuthContext } from './AuthContext';

const SignalRContext = createContext();

export const SignalRProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const connection = useRef(null);
  const [isConnected, setIsConnected] = useState(false);
  const [token, setToken] = useState(null);
  const previousUserId = useRef(null);

  useEffect(() => {
    async function configureNotifications() {
      const pushToken = await registerForPushNotificationsAsync();
      setToken(pushToken);
    }

    configureNotifications();
  }, []);

  useEffect(() => {
    if (user && user.id !== previousUserId.current) {
      if (connection.current) {
        connection.current.stop().then(() => {
          console.log("Desconectado do SignalR");
          startSignalRConnection(user.id);
        });
      } else {
        startSignalRConnection(user.id);
      }

      previousUserId.current = user.id;
    }
  }, [user]);

  const startSignalRConnection = (userId) => {
    connection.current = new SignalR.HubConnectionBuilder()
      .withUrl(`${API_BASE_URL}/chatHub`)
      .configureLogging(SignalR.LogLevel.Information)
      .build();

    connection.current.start()
      .then(() => {
        console.log("Conectado ao SignalR");
        setIsConnected(true);
      })
      .catch((err) => console.error("Erro ao conectar ao SignalR", err));

    connection.current.on("SendMessageNotification", (message) => {
      scheduleNotification(
        {
          title: "Nova mensagem",
          body: "Você recebeu uma nova mensagem...",
          data: { data: message },
        },
        { token }
      );
    });

    return () => {
      if (connection.current) {
        connection.current.stop().then(() => console.log("Desconectado do SignalR"));
      }
    };
  };

  return (
    <SignalRContext.Provider value={{ connection: connection.current, isConnected }}>
      {children}
    </SignalRContext.Provider>
  );
};

export const useSignalR = () => {
  return useContext(SignalRContext);
};
