import { Link, useHistory } from 'react-router-dom'
import { FormEvent, useState } from 'react'
import illustrationImg from '../assents/imagens/illustration.svg';
import logoImg from '../assents/imagens/logo.svg';
import googleIconImg from '../assents/imagens/google-icon.svg';
import '../styles/auth.scss'
import { Button } from '../components/Button';
import { database } from '../services/firebase';
import { useAuth } from '../hooks/useAuth';

export function NewRoom() {

    const { user } = useAuth();
    const history = useHistory();
    const [newRoom, setNewRoom] = useState('');
    async function handleCreateRoom(event: FormEvent) {
        event.preventDefault();

        if (newRoom.trim() == '') {
            return;
        }

        const roomRef = database.ref('rooms');
        const firebasRoom = await roomRef.push({
            title: newRoom,
            authorID: user?.id,

        })

        history.push(`/rooms/${firebasRoom.key}`);

    }
    return (
        <div id="page_auth">
            <aside>
                <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo-real</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="Letmeask" />

                    <h2>Criar uma nova sala</h2>

                    <form onSubmit={handleCreateRoom}>
                        <input
                            type="text"
                            placeholder="Nome da sala"
                            onChange={event => setNewRoom(event.target.value)}
                            value={newRoom}
                        />
                        <Button type="submit">
                            Criar sala
                        </Button>
                    </form>

                    <p>Quer entrar em uma sala existente?<Link to="/"> clique aqui</Link></p>

                </div>
            </main>
        </div>
    )
}