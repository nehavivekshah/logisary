'use client';
import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:3000';

export const useSocket = () => {
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        const socketIo = io(SOCKET_URL);

        setSocket(socketIo);

        socketIo.on('connect', () => {
            console.log('Connected to socket server');
        });

        return () => {
            socketIo.disconnect();
        };
    }, []);

    return socket;
};
