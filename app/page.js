'use client'
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Home() {
  const router = useRouter();
  const [usuarios, setUsuarios] = useState(() => {
    const storedUsuarios = localStorage.getItem("usuarios");
    return storedUsuarios ? JSON.parse(storedUsuarios) : [];
  });
  console.log(usuarios)

  useEffect(() => {
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
  }, [usuarios]);

  const ConfirmarUsuario = (e) => {
    e.preventDefault();
    const confirmBoton = window.confirm('¿Confirmar usuario?');
    if (confirmBoton) {
      const nuevoUsuario = {
        id: Date.now(),
        nombre: e.target.nombre.value,
        puntos: 0,
      };
      setUsuarios([...usuarios, nuevoUsuario]);
      e.target.reset();
      console.log(nuevoUsuario.id)
      router.push(`/components/paises/${nuevoUsuario.id}`);
    }
  }

  return (
    <div className="container">
      <h1>Juego de adivinar la bandera</h1>
      <div className="form-container">
        <form name="form" onSubmit={ConfirmarUsuario}>
          <input type="text" name="nombre" placeholder="Nombre de usuario" required />
          <button type="submit" className="button">Comenzar</button>
        </form>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Puntos</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td>{usuario.nombre}</td>
                <td>{usuario.puntos}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
