import { useAuth } from '../hooks/useAuth'
import logoutImg from '../assents/imagens/logout.svg'
import '../styles/ButtonLogout.scss'

export const ButtonLogout: React.FC = () => {
    const { user, signOut } = useAuth();

    if (!user) {
        return <></>;
    }

    return (
        <a href="" type="button" aria-label="Deslogar a conta" onClick={signOut}>
            logout
        </a>


    );
};