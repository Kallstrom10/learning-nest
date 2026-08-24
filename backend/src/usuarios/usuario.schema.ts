import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum Sexo {
  MASCULINO = 'MASCULINO',
  FEMININO = 'FEMININO',
}

// Isto cria o createdAt e updatedAt automaticamente
@Schema({ 
  timestamps: true,
  toJSON: {
    virtuals: true,
    versionKey: false,
    transform: (doc, ret: any) => {
      ret.id = ret._id; // Copia o _id para id
      delete ret._id;   // Apaga o _id original
    }
  }
})
export class Usuario extends Document {
  @Prop({ required: true })
  nome: string;

  @Prop({ required: true, unique: true })
  bi: string;

  @Prop({ required: true, unique: true })
  telefone: string;

  @Prop({ required: true })
  dataNascimento: string;

  @Prop({ required: true, enum: Sexo })
  sexo: Sexo;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  fotoPerfil: string;

  @Prop({ required: true })
  cidade: string;
}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);