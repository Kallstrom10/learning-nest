'use client';

import { useState, useEffect } from 'react';
import { Toaster, toast } from 'sonner';
import { Usuario, Sexo, CIDADES_ANGOLA } from '../app/types/usuario';
import { Formulario } from '../app/components/Formulario';
import { Tabela } from '../app/components/Tabela';

const API_URL = 'http://192.168.18.6:3005/usuarios';

export default function Home() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [nome, setNome] = useState('');
  const [bi, setBi] = useState('');
  const [telefone, setTelefone] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [sexo, setSexo] = useState<Sexo>('MASCULINO');
  const [email, setEmail] = useState('');
  const [fotoPerfil, setFotoPerfil] = useState('');
  const [cidade, setCidade] = useState(CIDADES_ANGOLA[0]);

  const fetchUsuarios = async () => {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error();
      const data = await res.json();
      setUsuarios(data);
    } catch {
      toast.error('Erro ao conectar ao backend Nest.Js');
    }
  };

  useEffect(() => { fetchUsuarios(); }, []);

  const resetForm = () => {
    setNome(''); setBi(''); setTelefone(''); setDataNascimento('');
    setSexo('MASCULINO'); setEmail(''); setFotoPerfil(''); setCidade(CIDADES_ANGOLA[0]);
    setEditingId(null);
  };

  const handleEdit = (user: Usuario) => {
    setEditingId(user.id); setNome(user.nome); setBi(user.bi); setTelefone(user.telefone);
    setDataNascimento(user.dataNascimento); setSexo(user.sexo); setEmail(user.email);
    setFotoPerfil(user.fotoPerfil || ''); setCidade(user.cidade);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Deseja eliminar este usuário?')) return;
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error();
      toast.success('Usuário eliminado!');
      fetchUsuarios();
    } catch {
      toast.error('Erro ao eliminar usuário');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = { nome, bi, telefone, dataNascimento, sexo, email, fotoPerfil: fotoPerfil || undefined, cidade };
    const url = editingId ? `${API_URL}/${editingId}` : API_URL;
    const method = editingId ? 'PATCH' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(Array.isArray(data.message) ? data.message[0] : data.message);

      toast.success(editingId ? 'Usuário atualizado!' : 'Usuário cadastrado!');
      resetForm();
      fetchUsuarios();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8">
      <Toaster position="top-right" richColors />
      <div className="max-w-6xl mx-auto space-y-10">
        <header className="border-b border-slate-800 pb-5">
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
            Gestão de Usuários
          </h1>
          <p className="text-slate-400 text-sm mt-1">Next.Js + Nest.Js + Mongoose + MongoDB</p>
        </header>

        <Formulario
          editingId={editingId} loading={loading}
          nome={nome} setNome={setNome} bi={bi} setBi={setBi}
          telefone={telefone} setTelefone={setTelefone}
          dataNascimento={dataNascimento} setDataNascimento={setDataNascimento}
          sexo={sexo} setSexo={setSexo} email={email} setEmail={setEmail}
          fotoPerfil={fotoPerfil} setFotoPerfil={setFotoPerfil}
          cidade={cidade} setCidade={setCidade}
          handleSubmit={handleSubmit} resetForm={resetForm}
        />

        <Tabela
          usuarios={usuarios} fetchUsuarios={fetchUsuarios}
          handleEdit={handleEdit} handleDelete={handleDelete}
        />
      </div>
    </main>
  );
}