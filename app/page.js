import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>hola</h1>
      <Link href={`/components/paises/`}>Adivinar bandera</Link>

    </div>
  );
}
