
import logoImg from '../assents/imagens/logo.svg'
import deleteImg from '../assents/imagens/delete.svg'
import checkImg from '../assents/imagens/check.svg'
import answerImg from '../assents/imagens/answer.svg'
import '../styles/room.scss'
import { Button } from '../components/Button'
import { RoomCode } from '../components/RoomCode'
import { useParams } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import noQuestions from '../assents/imagens/empty-questions.svg'
import { Link, useHistory } from 'react-router-dom'
import { Question } from '../components/Question'
import { useRoom } from '../hooks/useRoom'
import { database } from '../services/firebase'


type RoomParams = {
    id: string;
}



export function AdminRoom() {

    const history = useHistory();
    const { user } = useAuth();
    const params = useParams<RoomParams>();
    const roomId = params.id;
    const { title, questions } = useRoom(roomId)


    async function handleEndRoom() {
        database.ref(`rooms/${roomId}`).update({
            endedAt: new Date()
        })

        history.push('/')
    }

    async function handleDeleteQuestion(questionId: string) {
        if (window.confirm('Tem certeza que você deseja excluir esta pergunta?')) {
            await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
        }
    }

    async function handleCheckQuestionAsAnswered(questionId: string) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isAnswered: true
        })
    }

    async function handleHighlightQuestion(questionId: string) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isHighlighted: true
        })
    }


    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <Link to="/"><img src={logoImg} alt="Letmeask" /></Link>
                    <div>
                        <RoomCode code={params.id}></RoomCode>
                        <Button isOutlined onClick={handleEndRoom}>Encerrar a sala</Button>
                    </div>
                </div>

            </header>
            <main className="content">
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
                </div>



                <div className="questions-list">
                    {questions.length > 0 ? questions.map(question => {
                        return (
                            <Question
                                key={question.id}
                                content={question.content}
                                author={question.author}
                                isHighlighted={question.isHighlighted}
                                isAnswered={question.isAnswered}
                            >
                                {!question.isAnswered && (
                                    <>
                                        <button
                                            type="button"
                                            onClick={() => handleCheckQuestionAsAnswered(question.id)}>
                                            <img src={checkImg} alt="Marcar pergunta como respondida" />
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => handleHighlightQuestion(question.id)}>
                                            <img src={answerImg} alt="Dar destaque a pergunta" />
                                        </button>
                                    </>
                                )}

                                <button
                                    type="button"
                                    onClick={() => handleDeleteQuestion(question.id)}>
                                    <img src={deleteImg} alt="Remover pergunta" />
                                </button>
                            </Question>
                        )
                    }) : <div className="noQUestion">
                        <img src={noQuestions} alt="" />
                        <p>Nenhuma pergunta por aqui ainda!</p>
                    </div>}
                </div>
            </main>
        </div>
    )
}