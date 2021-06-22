import { Link } from 'react-router-dom'
import illustrationImg from '../assents/imagens/illustration.svg';
import logoImg from '../assents/imagens/logo.svg';
import googleIconImg from '../assents/imagens/google-icon.svg';
import '../styles/auth.scss'
import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';

export function NewRoom() {

    const { user } = useAuth();
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
                    <h1>{user?.name}</h1>
                    <h2>Criar uma nova sala</h2>

                    <form action="">
                        <input
                            type="text"
                            placeholder="Nome da sala"
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