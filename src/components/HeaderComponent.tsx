import { signOut } from "next-auth/react";
import { auth } from "../../auth";
import BtnLogout from "./BtnLogout";
import Link from "next/link";

export async function HeaderComponent() {
  const session = await auth();
  console.log("session", session);

  return (
    <header className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/vagas">Vagas</a>
            </li>
            {session?.user && (
              <li>
                <a href="/minhas-vagas">Minhas Vagas</a>
              </li>
            )}
            <li>
              <a href="/sobre">Sobre</a>
            </li>
          </ul>
        </div>
        <a href="/" className="btn btn-ghost text-xl">
          daisyUI
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/vagas">Vagas</a>
          </li>
          {session?.user && (
            <li>
              <a href="/minhas-vagas">Minhas Vagas</a>
            </li>
          )}
          <li>
            <a href="/sobre">Sobre</a>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        {!session?.user && (
          <div className="flex gap-3">
            <Link href="/login" className="btn">
              Login
            </Link>
            <Link href="/register" className="btn btn-outlin">
              Registrar-se
            </Link>
          </div>
        )}

        {session?.user && <BtnLogout />}
      </div>
    </header>
  );
}
