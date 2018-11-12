import React, { Component } from 'react';

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = { msg: '' }

    this.envia = this.envia.bind(this);
  }

  envia(e) {
    this.setState({ msg: '' });
    e.preventDefault();

    const login = this.login.value;
    const senha = this.senha.value;
    const confirmacao = this.confirmacao.value;
    const urlPerfil = this.urlPerfil.value;

    if(login === '' || 
       senha === ''  || 
       confirmacao === ''  || 
       urlPerfil === '' ) {
      this.setState({ msg: 'Preencha todos os campos' });
      return;
    }

    if(senha !== confirmacao) {
      this.setState({ msg: 'Senha e Confirmação devem ser iguais' });
      return;
    }

    const requestInfo = {
      method: 'POST',
      body: JSON.stringify({ login, senha, urlPerfil }),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    };

    fetch('http://localhost:8080/usuarios', requestInfo)
    .then(response => {
        return response.json();
      })
      .then(json => {
        if(json.errors) {
          for(let erro in json.errors) {
            const message = json.errors[erro];
            const messageText = message.defaultMessage + ": "+ message.rejectedValue;
            this.setState({ msg: messageText });
          }
          return null;
        }
        
        if(json.ok){
          console.log(json);
          console.log('ok');
        }
      });
  }

  render() {
    return (
      <div className="signup-box">
        <h1 className="header-logo">Signup</h1>
        <span className="message">{this.state.msg}</span>
        <form onSubmit={ this.envia }>
          <label>
            Login
            <input type="text" ref={(input) => this.login = input} required />
          </label>
          <label>
            Senha
            <input type="password" ref={(input) => this.senha = input} required />
          </label>
          <label>
            Confirmação
            <input type="password" ref={(input) => this.confirmacao = input} required />
          </label>
          <label>
            Url do perfil
            <input type="text" ref={(input) => this.urlPerfil = input}
                   placeholder="http://endereco.com"
                   pattern="(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})"
                   required />
          </label>
          <input type="submit" value="Signup"/>
        </form>
      </div>
    );
  }
}