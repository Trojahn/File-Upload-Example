import { useEffect, useState } from 'react'
// import reactLogo from '/assets/react.svg'
// import viteLogo from '/vite.svg'





function App() {

  const url = "http://localhost:8000";

  const [data, setData] = useState([]);
  // Usado para guardar os nomes dos campos.
  const [inp, setInput] = useState({
    login: "",
    foto: ""
  });
  // Usado para guardar o arquivo a ser enviado.
  const [arquivo, setArquivo] = useState(null);

  async function carregarDados() {
    const res = await fetch(`${url}/perfil`);
    const json = await res.json();
    setData(json);
  }

  useEffect(() => {
    carregarDados();
  }, []);

  function resetForm(e) {
    if (e) {
      e.preventDefault();
    }

    setInput({
      login: "",
      foto: ""
    });
    setArquivo(null);
  }

  async function atualizarForm(e) {
    setInput({ ...inp, [e.target.name]: e.target.value });
  }

  async function cadastrar(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("login", inp.login);
    formData.append("foto", arquivo);

    let res = await fetch(`${url}/perfil`, { method: "POST", body: formData });
    if (!res.ok) {
      alert("Não foi possível realizar o cadastro");
      return;
    }
    alert("Cadastrado com sucesso!");
    resetForm();
  }

  function changeFile(e) {
    if (e.target.files.length > 0) {
      // Guarda os dados do arquivo.
      setArquivo(e.target.files[0]);
      // Guarda o nome do arquivo.
      setInput({ ...inp, [e.target.name]: e.target.files[0].name });
    }
  }

  let perfis = [];
  if (data.length > 0) {
    for (let perfil of data) {
      let img;
      if (perfil.foto) {
        img = `${url}/foto/${perfil.foto}`;
      } else {
        img = "https://placehold.co/300x200?text=Sem+Imagem";
      }

      let item = (
        <div className="box my-5" data-id={perfil.id} key={perfil.id}>
          <article className="media">
            <div className="media-left">
              <figure className="image is-300x200">
                <img src={img} alt="Image" />
              </figure>
            </div>
            <div className="media-content">
              <div className="content">
                <h4>{perfil.id}</h4>
                <p>
                  {perfil.login}
                </p>
              </div>
            </div>
          </article>
        </div>
      );
      perfis.push(item);
    }
  }


  return (
    <>


      <header>
        <section className="hero is-success">
          <div className="hero-body">
            <p className="title">EXEMPLO</p>
            <p className="subtitle">Exemplo de upload de arquivo</p>
          </div>
        </section>
      </header>
      <main>
        <section className='columns'>
          <div className='column is-1'>

          </div>
          <div className='column my-5'>
            <form onSubmit={cadastrar}>
              <div className="field">
                <label className="label">Login</label>
                <div className="control">
                  <input className="input" type="text" placeholder="Login" required name="login" onChange={atualizarForm} value={inp.login} />
                </div>
              </div>

              <div className="field">
                <div className="file has-name is-fullwidth">
                  <label className="file-label">
                    <input className="file-input" type="file" name="foto" accept="image/*" onChange={changeFile} />
                    <span className="file-cta">
                      <span className="file-icon">
                        <i className="fas fa-upload"></i>
                      </span>
                      <span className="file-label">Escolha uma foto</span>
                    </span>
                    <span className="file-name">{inp.foto}</span>
                  </label>
                </div>
              </div>

              <div className="field is-grouped">
                <div className="control">
                  <button className="button is-link">Enviar</button>
                </div>
                <div className="control">
                  <button className="button is-link is-light" onClick={resetForm}>Limpar</button>
                </div>
              </div>
            </form>
            <h2 className='subtitle has-text-centered'>Perfis cadastrados</h2>
            {perfis}
          </div>
          <div className='column is-1'>

          </div>
        </section>

      </main>










    </>
  )
}

export default App
