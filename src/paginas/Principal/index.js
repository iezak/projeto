import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db, firebaseConfigurado } from "../../firebase";

function Principal() {
  const [usuario, setUsuario] = useState(null);
  const [mensagem, setMensagem] = useState("Carregando dados do usuario...");
  const navigate = useNavigate();

  useEffect(() => {
    if (!firebaseConfigurado) {
      setMensagem("Configure as variaveis do Firebase no arquivo .env.");
      return undefined;
    }

    const cancelarObservacao = onAuthStateChanged(auth, async (usuarioLogado) => {
      if (!usuarioLogado) {
        navigate("/login");
        return;
      }

      const documento = await getDoc(doc(db, "usuarios", usuarioLogado.uid));
      if (documento.exists()) {
        setUsuario(documento.data());
        setMensagem("");
      } else {
        setMensagem("Dados do usuario nao encontrados no Firestore.");
      }
    });

    return cancelarObservacao;
  }, [navigate]);

  async function sair() {
    if (!auth) {
      navigate("/login");
      return;
    }

    await signOut(auth);
    navigate("/login");
  }

  return (
    <main className="page">
      <section className="profile-panel">
        <div className="profile-header">
          <div>
            <span className="eyebrow">Pagina principal</span>
            <h1>Dados do usuario</h1>
          </div>
          <button type="button" className="secondary-button" onClick={sair}>
            Sair
          </button>
        </div>

        {mensagem && <p className="mensagem">{mensagem}</p>}

        {usuario && (
          <dl className="user-data">
            <div>
              <dt>Nome</dt>
              <dd>{usuario.nome}</dd>
            </div>
            <div>
              <dt>Sobrenome</dt>
              <dd>{usuario.sobrenome}</dd>
            </div>
            <div>
              <dt>Data de nascimento</dt>
              <dd>{usuario.dataNascimento}</dd>
            </div>
          </dl>
        )}

        {!firebaseConfigurado && (
          <p className="link-text">
            Voltar para <Link to="/login">Login</Link>
          </p>
        )}
      </section>
    </main>
  );
}

export default Principal;
