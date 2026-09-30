"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight, Menu, X } from "lucide-react"
import { useState } from "react"

const links = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="site-header">
      <div className="shell nav-wrap">
        <Link href="/" className="brand" onClick={() => setOpen(false)}>
          <span className="brand-logo"><Image src="/images/logos/smithynobg.png" alt="Smithy Systems" width={180} height={180} priority /></span>
          <span className="sr-only">Smithy Systems</span>
        </Link>
        <nav className={open ? "main-nav open" : "main-nav"}>
          {links.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}</Link>
          ))}
          <Link className="nav-cta" href="/contact" onClick={() => setOpen(false)}>
            Work with us <ArrowUpRight size={16} />
          </Link>
        </nav>
        <button className="menu-button" type="button" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </header>
  )
}
