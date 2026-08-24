import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './usuario.schema'; // Certifique-se de que o caminho está correto

@Injectable()
export class UsuariosService {
  constructor(
    // Injetamos o Model do Mongoose em vez do PrismaService
    @InjectModel(Usuario.name) private readonly usuarioModel: Model<Usuario>
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto) {
    // 1. Verificar se o BI já existe
    const biExiste = await this.usuarioModel.findOne({ bi: createUsuarioDto.bi }).exec();
    if (biExiste) {
      throw new ConflictException('Já existe um usuário cadastrado com este Nº de BI.');
    }

    // 2. Verificar se o E-mail já existe
    const emailExiste = await this.usuarioModel.findOne({ email: createUsuarioDto.email }).exec();
    if (emailExiste) {
      throw new ConflictException('Já existe um usuário cadastrado com este E-mail.');
    }

    // 3. Criar usuário no MongoDB
    const novoUsuario = new this.usuarioModel(createUsuarioDto);
    return novoUsuario.save();
  }

  async findAll() {
    // Retorna todos os usuários ordenados pela data de criação (mais recentes primeiro)
    return this.usuarioModel.find().sort({ createdAt: -1 }).exec();
  }

  async findOne(id: string) {
    // O Mongoose usa findById diretamente para buscar pelo ID
    const usuario = await this.usuarioModel.findById(id).exec();
    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado.');
    }
    return usuario;
  }

  async update(id: string, updateUsuarioDto: UpdateUsuarioDto) {
    // Verifica se o usuário existe antes de tentar atualizar
    await this.findOne(id);

    // O { new: true } garante que o Nest.Js devolva o usuário já atualizado
    return this.usuarioModel.findByIdAndUpdate(id, updateUsuarioDto, { new: true }).exec();
  }

  async remove(id: string) {
    // Verifica se o usuário existe antes de tentar eliminar
    await this.findOne(id);

    return this.usuarioModel.findByIdAndDelete(id).exec();
  }
}