export type Sexo = 'MASCULINO' | 'FEMININO';

export interface Usuario {
  id: string;
  nome: string;
  bi: string;
  telefone: string;
  dataNascimento: string;
  sexo: Sexo;
  email: string;
  fotoPerfil?: string;
  cidade: string;
  createdAt?: string;
}

export const CIDADES_ANGOLA = [
    'Bengo', 'Benguela', 'Bié', 'Cabinda', 'Cuando', 'Cuanza Norte',  
    'Cuanza Sul', 'Cubango', 'Cunene', 'Huambo', 'Huíla', 'Icolo e Bengo', 
    'Luanda', 'Lunda Norte', 'Lunda Sul', 'Malanje', 'Moxico', 'Moxico Norte',
    'Namibe', 'Uíge', 'Zaire'
];