import React from "react";
import { Link } from 'react-router-dom';
import styled from "styled-components";

class Components {
    public static Header = styled.header`
        background:#000000;
        color:#ffffff;
        padding:15px;
        display:flex;
        justify-content:space-between;
        align-items:center;
        flex-wrap:wrap;
    `;
    public static Title = styled(Link)`
        font-size:1.9em;
        text-decoration:none;
        color:white;
        font-weight:600;    
    `;
    public static Nav = styled.nav`
        display:flex;
        align-items:center;
        gap:20px;
        padding:5px;
    `;
    public static Item = styled(Link)`
        font-size:1.1em;
        font-weight:600;
        color:white;
        text-decoration: none;
    `;
}

const Header: React.FC = () => {
    return (
        <Components.Header>
            <Components.Title to='/'>Rock Store</Components.Title>
            <Components.Nav>
                <Components.Item to="/entrar">
                    Entrar
                </Components.Item>
                <Components.Item to="/registrar">
                    Registre-se
                </Components.Item>
            </Components.Nav>
        </Components.Header>
    );
};

export default Header;
