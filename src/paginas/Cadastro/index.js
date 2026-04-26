import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db, firebaseConfigurado } from "../../firebase";

const estadoInicial = {
  email: "",
  senha: "",
  nome: "",
  sobrenome: "",
  dataNascimento: "",
};

function Cadastro() {
  const [formulario, setFormulario] = useState(estadoInicial);
  const [mensagem, setMensagem] = useState("");
  const [carregando, setCarregando] = useState(false);
  const navigate = useNavigate();

  function atualizarCampo(event) {
    const { name, value } = event.target;
    setFormulario((dadosAtuais) => ({ ...dadosAtuais, [name]: value }));
  }

  async function cadastrarUsuario(event) {
    event.preventDefault();
    setMensagem("");

    if (!firebaseConfigurado) {
      setMensagem("Configure as variaveis do Firebase no arquivo .env.");
      return;
    }

    try {
      setCarregando(true);
      const credencial = await createUserWithEmailAndPassword(
        auth,
        formulario.email,
        formulario.senha
      );

      await setDoc(doc(db, "usuarios", credencial.user.uid), {
        uid: credencial.user.uid,
        email: formulario.email,
        nome: formulario.nome,
        sobrenome: formulario.sobrenome,
        dataNascimento: formulario.dataNascimento,
      });

      setFormulario(estadoInicial);
      navigate("/principal");
    } catch (erro) {
      if (erro.code === "auth/email-already-in-use") {
        setMensagem("Este e-mail ja esta cadastrado.");
      } else if (erro.code === "auth/weak-password") {
        setMensagem("A senha deve ter pelo menos 6 caracteres.");
      } else {
        setMensagem("Nao foi possivel cadastrar o usuario.");
      }
    } finally {
      setCarregando(false);
    }
  }

  return (
    <main className="page">
      <section className="auth-panel">
        <h1>Cadastro</h1>
        <form onSubmit={cadastrarUsuario}>
          <label>
            E-mail
            <input
              type="email"
              name="email"
              value={formulario.email}
              onChange={atualizarCampo}
              required
            />
          </label>

          <label>
            Senha
            <input
              type="password"
              name="senha"
              value={formulario.senha}
              onChange={atualizarCampo}
              minLength="6"
              required
            />
          </label>

          <label>
            Nome
            <input
              type="text"
              name="nome"
              value={formulario.nome}
              onChange={atualizarCampo}
              required
            />
          </label>

          <label>
            Sobrenome
            <input
              type="text"
              name="sobrenome"
              value={formulario.sobrenome}
              onChange={atualizarCampo}
              required
            />
          </label>

          <label>
            Data de nascimento
            <input
              type="date"
              name="dataNascimento"
              value={formulario.dataNascimento}
              onChange={atualizarCampo}
              required
            />
          </label>

          <button type="submit" disabled={carregando}>
            {carregando ? "Cadastrando..." : "Cadastrar"}
          </button>
        </form>

        {mensagem && <p className="mensagem erro">{mensagem}</p>}
        <p className="link-text">
          Ja tem cadastro? <Link to="/login">Entrar</Link>
        </p>
      </section>
    </main>
  );
}

export default Cadastro;
