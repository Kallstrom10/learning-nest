'use client';

import { UserPlus, Pencil, User, CreditCard, Phone, Calendar, Mail, MapPin, RefreshCw, Upload, X } from 'lucide-react';
import { Sexo, CIDADES_ANGOLA } from '../types/usuario';

interface FormularioProps {
  editingId: string | null;
  loading: boolean;
  nome: string; setNome: (v: string) => void;
  bi: string; setBi: (v: string) => void;
  telefone: string; setTelefone: (v: string) => void;
  dataNascimento: string; setDataNascimento: (v: string) => void;
  sexo: Sexo; setSexo: (v: Sexo) => void;
  email: string; setEmail: (v: string) => void;
  fotoPerfil: string; setFotoPerfil: (v: string) => void;
  cidade: string; setCidade: (v: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  resetForm: () => void;
}

export function Formulario({
  editingId, loading, nome, setNome, bi, setBi, telefone, setTelefone,
  dataNascimento, setDataNascimento, sexo, setSexo, email, setEmail,
  fotoPerfil, setFotoPerfil, cidade, setCidade, handleSubmit, resetForm
}: FormularioProps) {

  // Converte o arquivo do computador para Base64
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFotoPerfil(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold flex items-center gap-2 text-slate-200">
          {editingId ? <Pencil className="w-5 h-5 text-amber-400" /> : <UserPlus className="w-5 h-5 text-blue-400" />}
          {editingId ? 'Editar Cadastro' : 'Novo Cadastro'}
        </h2>
        {editingId && (
          <button type="button" onClick={resetForm} className="text-xs text-slate-400 hover:text-white underline cursor-pointer">
            Cancelar Edição
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">Nome Completo</label>
          <div className="relative">
            <User className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
            <input type="text" required placeholder="Ex: Manuel António" value={nome} onChange={(e) => setNome(e.target.value)} className="w-full bg-slate-800/60 border border-slate-700/80 rounded-xl py-2 pl-9 pr-3 text-sm focus:outline-none focus:border-blue-500" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">Nº do BI (14 caracteres)</label>
          <div className="relative">
            <CreditCard className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
            <input type="text" required maxLength={14} placeholder="006123456LA042" value={bi} onChange={(e) => setBi(e.target.value)} className="w-full bg-slate-800/60 border border-slate-700/80 rounded-xl py-2 pl-9 pr-3 text-sm focus:outline-none focus:border-blue-500" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">Telefone (Começa por 9)</label>
          <div className="relative">
            <Phone className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
            <input type="text" required maxLength={9} placeholder="923456789" value={telefone} onChange={(e) => setTelefone(e.target.value)} className="w-full bg-slate-800/60 border border-slate-700/80 rounded-xl py-2 pl-9 pr-3 text-sm focus:outline-none focus:border-blue-500" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">Data de Nascimento (dd/mm/aaaa)</label>
          <div className="relative">
            <Calendar className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
            <input type="text" required placeholder="25/12/1998" value={dataNascimento} onChange={(e) => setDataNascimento(e.target.value)} className="w-full bg-slate-800/60 border border-slate-700/80 rounded-xl py-2 pl-9 pr-3 text-sm focus:outline-none focus:border-blue-500" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">E-mail</label>
          <div className="relative">
            <Mail className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
            <input type="email" required placeholder="exemplo@domain.ao" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-slate-800/60 border border-slate-700/80 rounded-xl py-2 pl-9 pr-3 text-sm focus:outline-none focus:border-blue-500" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">Sexo</label>
          <select value={sexo} onChange={(e) => setSexo(e.target.value as Sexo)} className="w-full bg-slate-800/60 border border-slate-700/80 rounded-xl py-2 px-3 text-sm focus:outline-none focus:border-blue-500">
            <option value="MASCULINO">Masculino</option>
            <option value="FEMININO">Feminino</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">Província</label>
          <div className="relative">
            <MapPin className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
            <select value={cidade} onChange={(e) => setCidade(e.target.value)} className="w-full bg-slate-800/60 border border-slate-700/80 rounded-xl py-2 pl-9 pr-3 text-sm focus:outline-none focus:border-blue-500">
              {CIDADES_ANGOLA.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        {/* CAMPO NOVO DE SELEÇÃO DE IMAGEM DO COMPUTADOR */}
        <div className="lg:col-span-2">
          <label className="block text-xs font-medium text-slate-400 mb-1">Foto de Perfil</label>
          <div className="flex items-center gap-3">
            {fotoPerfil && (
              <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-slate-700 bg-slate-800 flex-shrink-0">
                <img src={fotoPerfil} alt="Preview" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => setFotoPerfil('')}
                  className="absolute top-0 right-0 bg-red-600/80 hover:bg-red-600 text-white p-0.5 rounded-bl text-xs"
                  title="Remover foto"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}

            <label
              htmlFor="fotoInput"
              className="flex-1 flex items-center justify-center gap-2 bg-slate-800/60 hover:bg-slate-800 border border-slate-700/80 border-dashed rounded-xl py-2 px-4 text-sm text-slate-300 cursor-pointer transition-colors"
            >
              <Upload className="w-4 h-4 text-slate-400" />
              <span>{fotoPerfil ? 'Alterar foto selecionada' : 'Selecionar foto de Perfil'}</span>
              <input
                id="fotoInput"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>
        </div>

        <div className="md:col-span-2 lg:col-span-3 flex justify-end gap-3 mt-2">
          <button type="button" onClick={resetForm} className="px-5 py-2.5 rounded-xl border border-slate-700 text-slate-300 text-sm hover:bg-slate-800 cursor-pointer">
            Limpar
          </button>
          <button type="submit" disabled={loading} className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm flex cursor-pointer items-center gap-2 disabled:opacity-50">
            {loading && <RefreshCw className="w-4 h-4 animate-spin" />}
            {editingId ? 'Salvar Alterações' : 'Cadastrar Usuário'}
          </button>
        </div>
      </form>
    </section>
  );
}