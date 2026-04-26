import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, firebaseConfigurado } from "../../firebase";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [carregando, setCarregando] = useState(false);
  const navigate = useNavigate();

  async function acessarSistema(event) {
    event.preventDefault();
    setMensagem("");

    if (!firebaseConfigurado) {
      setMensagem("Configure as variaveis do Firebase no arquivo .env.");
      return;
    }

    try {
      setCarregando(true);
      await signInWithEmailAndPassword(auth, email, senha);
      navigate("/principal");
    } catch (erro) {
      setMensagem("Usuario nao cadastrado ou senha incorreta.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <main className="page">
      <section className="auth-panel">
        <h1>Login</h1>
        <form onSubmit={acessarSistema}>
          <label>
            E-mail
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>

          <label>
            Senha
            <input
              type="password"
              value={senha}
              onChange={(event) => setSenha(event.target.value)}
              required
            />
          </label>

          <button type="submit" disabled={carregando}>
            {carregando ? "Acessando..." : "Acessar pagina principal"}
          </button>
        </form>

        {mensagem && <p className="mensagem erro">{mensagem}</p>}
        <p className="link-text">
          Ainda nao tem conta? <Link to="/cadastro">Cadastrar</Link>
        </p>
      </section>
    </main>
  );
}

export default Login;
