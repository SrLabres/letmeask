import { useEffect } from "react";
import { useState } from "react";
import { database } from "../services/firebase";
import { useAuth } from "./useAuth";


type FirebaseQuestions = Record<string, {
    author: {
        name: string,
        avatar: string,
    }

    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
    likes: Record<string, {
        authorId: string
    }>
}>



type Questions = {
    id: string;
    author: {
        name: string,
        avatar: string,
    }

    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
    likeCount: number;
    likeId: string | undefined;
}


export function useRoom(roomId: string) {
    const [title, setTitle] = useState('');
    const { user } = useAuth()
    const [questions, setQuestions] = useState<Questions[]>([]);


    useEffect(() => {
        const roomRef = database.ref(`rooms/${roomId}`);

        roomRef.on('value', room => {
            const databaseRoom = room.val()
            const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};


            const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
                return {
                    id: key,
                    content: value.content,
                    author: value.author,
                    isAnswered: value.isAnswered,
                    isHighlighted: value.isHighlighted,
                    likeCount: Object.values(value.likes ?? {}).length,
                    likeId: Object.entries(value.likes ?? {}).find(([key, like]) => like.authorId === user?.id)?.[0],
                }
            })
            setTitle(databaseRoom.title);
            setQuestions(parsedQuestions.sort(function (a, b) {
                return a.likeCount > b.likeCount ? -1 : a.likeCount < b.likeCount ? 1 : 0;
            }).sort(function (a, b) {
                return a.isHighlighted > b.isHighlighted ? -1 : a.isHighlighted < b.isHighlighted ? 1 : 0
            }).sort(function (a, b) {
                return a.isAnswered > b.isAnswered ? 1 : a.isAnswered < b.isAnswered ? -1 : 0
            }));

        })

        return () => {
            roomRef.off('value');
        }

    }, [roomId, user?.id])

    return { questions, title }
}