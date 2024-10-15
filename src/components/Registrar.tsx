import React from "react";
import { Spinner } from "react-bootstrap";
import styled, { css, keyframes } from "styled-components";

class Components {
    private static animationDanger = keyframes`
        to {
            background-color: red;
        }
        from {
            background-color: #aa0000;
        }
    `;
    public static Container = styled.div`
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: #f0f0f0;
    `;
    public static Alert = styled.div`
        font-size: 1.8em;
        background: red;
        width: 600px;
        border-radius: 5px;
        color: white;
        padding: 15px; /* Aumenta o padding para melhor aparência */
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        animation: ${this.animationDanger} 0.5s infinite ease-in-out;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Sombra para destaque */
        margin-bottom: 20px; /* Espaçamento entre o alerta e o formulário */
        @media (max-width: 640px) {
            width: 90%; /* Ajusta a largura para telas pequenas */
            font-size: 1.5em; /* Reduz o tamanho da fonte */
        }
    `;
    public static Form = styled.form`
        display: flex;
        flex-direction: column;
        width: 600px;
        background: #ffffff; /* Fundo branco para o formulário */
        border-radius: 8px; /* Bordas arredondadas */
        padding: 20px; /* Aumenta o padding */
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1); /* Sombra sutil para o formulário */
        gap: 15px; /* Espaçamento entre os inputs */
        @media (max-width: 640px) {
            width: 90%; /* Ajusta a largura para telas pequenas */
        }
    `;
    public static Input = styled.input`
        width: 100%;
        padding: 12px; /* Aumenta o padding para maior conforto */
        border: 1px solid #ccc; /* Borda mais clara */
        border-radius: 5px;
        transition: border 0.3s; /* Transição suave para foco */
        &:focus {
            border-color: #007bff; /* Cor de borda ao focar */
            outline: none; /* Remove outline padrão */
        }
    `;
    private static ButtonDefault = css`
        padding: 12px;
        color: white;
        font-size: 1.2em;
        cursor: pointer;
        border: none;
        border-radius: 5px;
        opacity: 0.9;
        font-weight: 600;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Sombra para botões */
        transition: 0.3s all;
        &:hover {
            opacity: 1;
            transform: translateY(-2px); /* Efeito de elevação ao passar o mouse */
        }
        &:active {
            box-shadow: inset 0 4px 8px rgba(0, 0, 0, 0.2); /* Efeito de clique */
            transform: translateY(0);
        }
    `;
    public static ButtonReset = styled.button`
        ${this.ButtonDefault};
        background: red;
    `;
    public static ButtonSubmit = styled.button`
        ${this.ButtonDefault};
        background: green;
    `;
    public static GroupBtn = styled.div`
        display: flex;
        gap: 10px; /* Espaçamento entre os botões */
    `;
}

const Registrar: React.FC = () => {
    interface DatasForm {
        name: string;
        email: string;
        password: string;
    }
    const [datas, setDatas] = React.useState<DatasForm | null>(null);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | null>(null);
    const [hide, setHide] = React.useState<boolean>(false);
    const input = React.useRef<HTMLInputElement | null>(null);

    const hideAlert = (): void => setHide(true);
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        try {
            e.preventDefault();
            setLoading(true);
            const formData: FormData = new FormData(e.currentTarget);
            const response = Object.fromEntries(formData.entries()) as unknown as DatasForm;
            verifyData(response);
            setDatas(response);
            setError(null);
            e.currentTarget.reset();
            await register(response)
            console.log(datas);
        } catch (error) {
            setError((error as Error).message);
        } finally {
            setLoading(false);
            input.current?.focus();
            setHide(false);
        }
    }
    const register = async ({ name, email, password }: DatasForm): Promise<void> => {
        try {
            const response: Response = await fetch(
                'https://login-user-q30w.onrender.com/sigin',
                {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name, email, password })
                }
            )
            const json = await response.json();
            if (!response.ok) throw new Error(json.error);
        } catch (error) {
            setError((error as Error).message)
        }
    }
    const verifyData = ({ email, name, password }: DatasForm): void => {
        const arrayInputs: string[] = [email, name, password];
        const response = arrayInputs.some(element => element.trim().length === 0);
        if (response) throw new Error('Preencha todos os campos!');
    }
    return (
        <Components.Container>
            {error && !hide && (<Components.Alert onClick={hideAlert}>{error}</Components.Alert>)}
            <Components.Form onSubmit={(e) => handleSubmit(e)}>
                <Components.Input
                    autoComplete="username"
                    ref={input}
                    placeholder="Nome"
                    type="text"
                    id="name"
                    name="name" />
                <Components.Input
                    autoComplete="email"
                    placeholder="Email"
                    type="email"
                    id="email"
                    name="email" />
                <Components.Input
                    autoComplete="current-password"
                    placeholder="Senha"
                    type="password"
                    id="password"
                    name="password" />
                <Components.GroupBtn>
                    <Components.ButtonSubmit
                        type="submit">
                        {loading ? <Spinner /> : 'enviar'}
                    </Components.ButtonSubmit>
                    <Components.ButtonReset
                        onClick={hideAlert}
                        type="reset">Cancelar
                    </Components.ButtonReset>
                </Components.GroupBtn>
            </Components.Form>
        </Components.Container>
    );
}

export default Registrar;
