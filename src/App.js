import React, {Component} from "react";
import "./App.css";

class App extends Component{

  constructor (props) {
    super(props)

    this.state = {
      email: "",
      senha: "",
      mensagem: ""
    }

    this.validaLogin = this.validaLogin.bind(this);
  }

  validaLogin() {
    if (this.state.email === "eduardo.lino@pucpr.br" && this.state.senha === "123456") {
      this.setState({ mensagem: "Acessado com sucesso!" })
    } else {
      this.setState({ mensagem: "Usuário ou senha incorretos!" })
    }
  }

  render() {
    return (
      <div className="container">
        <div className="login-box">
          <h1>Login</h1>

          <input
            type="text"
            name="email"
            placeholder="Email"
            onChange={(e) => this.setState({ email: e.target.value })}
          />

          <input
            type="password"
            name="senha"
            placeholder="Senha"
            onChange={(e) => this.setState({ senha: e.target.value })}
          />

          <button onClick={this.validaLogin}>Acessar</button>

          <p className="mensagem">{this.state.mensagem}</p>
        </div>
      </div>
    )
  }
}

export default App;