import axios from "axios";

// Cria uma nova instância do Axios
const api = axios.create({
  baseURL: "https://blogpessoalnest-4wv9.onrender.com",
});

// Função para Cadastrar Usuário
export const cadastrarUsuario = async (url: string, dados: Object, setDados: Function) => {
  const resposta = await api.post(url, dados);
  setDados(resposta.data);
};

// Função para Autenticar Usuário
export const login = async (url: string, dados: Object, setDados: Function) => {
  const resposta = await api.post(url, dados);
  setDados(resposta.data);
};
