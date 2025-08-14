import Link from "next/link"

export default function NotFound() {
  return (
    <section className="w-full h-screen text-black flex items-center justify-center relative ">
      <div className="flex flex-col justify-center items-center">

      <h1 className="text-[15vh]">404</h1>

      <p className="text-2xl">Cet page n&apos;existe pas</p>

      <Link className='text-2xl text-blue-500 cursor-pointer' href='/'>retourner à la page d&apos;accueil </Link>
    </div>   
      </section>
  )
}
