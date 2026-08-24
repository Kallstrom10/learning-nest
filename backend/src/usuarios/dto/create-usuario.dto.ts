import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Length, Matches } from 'class-validator';

const cidadesAngola = [
    'Bengo', 'Benguela', 'Bié', 'Cabinda', 'Cuando', 'Cuanza Norte',  
    'Cuanza Sul', 'Cubango', 'Cunene', 'Huambo', 'Huíla', 'Icolo e Bengo', 
    'Luanda', 'Lunda Norte', 'Lunda Sul', 'Malanje', 'Moxico', 'Moxico Norte',
    'Namibe', 'Uíge', 'Zaire'
];

export enum Sexo{
    MASCULINO = 'MASCULINO',
    FEMININO = 'FEMININO'
}

export class CreateUsuarioDto {
  @IsString()
  @IsNotEmpty({ message: 'O nome completo é obrigatório.' })
  nome!: string;

  @IsString()
  @Length(14, 14, { message: 'O BI deve ter exatamente 14 caracteres.' })
  @Matches(/^[a-zA-Z0-9]{14}$/, { message: 'O BI deve conter apenas números e letras.' })
  bi!: string;

  @IsString()
  @Matches(/^9\d{8}$/, { message: 'O telefone deve ter 9 dígitos e começar com 9.' })
  telefone!: string;

  @IsString()
  @Matches(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/, { message: 'A data deve estar no formato dd/mm/aaaa.' })
  dataNascimento!: string;

  @IsEnum(Sexo, { message: 'Sexo inválido. Escolha MASCULINO ou FEMININO.' })
  sexo!: Sexo;

  @IsEmail({}, { message: 'E-mail com formato inválido.' })
  email!: string;

  @IsString()
  @IsOptional()
  fotoPerfil?: string;

  @IsString()
  @IsNotEmpty({ message: 'A cidade é obrigatória.' })
  // @IsIn(cidadesAngola, { message: 'Cidade não reconhecida.' }) // Descomente para forçar que seja uma das 21
  cidade!: string;
}