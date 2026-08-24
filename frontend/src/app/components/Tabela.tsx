'use client';

import { User, RefreshCw, Pencil, Trash2 } from 'lucide-react';
import { Usuario } from '../types/usuario';

interface TabelaProps {
  usuarios: Usuario[];
  fetchUsuarios: () => void;
  handleEdit: (user: Usuario) => void;
  handleDelete: (id: string) => void;
}

export function Tabela({ usuarios, fetchUsuarios, handleEdit, handleDelete }: TabelaProps) {
  return (
    <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-slate-200">Usuários Cadastrados - [ {usuarios.length} ]</h2>
        <button onClick={fetchUsuarios} className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 cursor-pointer" title="Atualizar Tabela">
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {usuarios.length === 0 ? (
        <div className="text-center py-12 text-slate-500 text-sm">
          Nenhum usuário cadastrado até ao momento.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="text-xs uppercase bg-slate-800/50 text-slate-400 border-b border-slate-700/50">
              <tr>
                <th className="py-3 px-4">Usuário</th>
                <th className="py-3 px-4">BI</th>
                <th className="py-3 px-4">Contato</th>
                <th className="py-3 px-4">Nascimento / Sexo</th>
                <th className="py-3 px-4">Cidade</th>
                <th className="py-3 px-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {usuarios.map((user) => (
                <tr key={user.id} className="hover:bg-slate-800/40 transition">
                  <td className="py-3 px-4 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-slate-800 overflow-hidden border border-slate-700 flex items-center justify-center flex-shrink-0">
                      {user.fotoPerfil ? (
                        <img src={user.fotoPerfil} alt={user.nome} className="w-full h-full object-cover" />
                      ) : (
                        <User className="w-5 h-5 text-slate-500" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium text-slate-100">{user.nome}</div>
                      <div className="text-xs text-slate-400">{user.email}</div>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-mono text-xs text-slate-300">{user.bi}</td>
                  <td className="py-3 px-4 text-xs">{user.telefone}</td>
                  <td className="py-3 px-4 text-xs">
                    {user.dataNascimento} <span className="text-slate-500">({user.sexo === 'MASCULINO' ? 'M' : 'F'})</span>
                  </td>
                  <td className="py-3 px-4 text-xs">{user.cidade}</td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => handleEdit(user)} className="p-1.5 text-slate-400 cursor-pointer hover:text-amber-400 hover:bg-slate-800 rounded-lg" title="Editar">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(user.id)} className="p-1.5 text-slate-400 cursor-pointer hover:text-rose-400 hover:bg-slate-800 rounded-lg" title="Eliminar">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}