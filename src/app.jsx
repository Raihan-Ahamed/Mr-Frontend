import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import './styles.css'
import { categories, menuItems, deliveryZones, bestSellerIds, sizeLabel } from './data'

/* ---------------- CONSTANTS & HELPERS ---------------- */
const PHONE_LABEL = '+880 1334-001133'
const TEL_LINK = 'tel:+8801334001133'
const WHATSAPP_LINK = 'https://wa.me/8801334001133'
const FACEBOOK_LINK = 'https://www.facebook.com/share/1KNz2xF86D/'
const ADDRESS = 'Chawkbazar, K.B Aman Ali Road, Chittagong'
const SPECIAL_IDS = ['p1', 'p18', 'b6', 'mb5', 'w2']
const CONFETTI_COLORS = ['#0b4fa8', '#e53935', '#ffc107', '#c9a24b', '#25D366']

const fmt = (n) => '৳' + n
const categoryIcon = (categoryId) => (categories.find((c) => c.id === categoryId) || {}).icon || '🍽️'
const priceOf = (item, size) => (item.sizes ? item.sizes[size] : item.price)
const lineKeyOf = (item, size) => (size ? `${item.id}-${size}` : item.id)
const defaultSize = (item, selectedSizes) =>
  item.sizes ? selectedSizes[item.id] || Object.keys(item.sizes)[0] : null

// Open 4:00 PM – 4:00 AM
const isShopOpen = () => {
  const h = new Date().getHours()
  return h >= 16 || h < 4
}

// Button "press" feedback: green -> orange for a moment, then run the action
function pressThen(e, fn) {
  const btn = e.currentTarget
  if (btn.dataset.busy) return
  btn.dataset.busy = '1'
  btn.classList.add('clicked')
  setTimeout(() => {
    delete btn.dataset.busy
    btn.classList.remove('clicked')
    fn()
  }, 380)
}

/* ---------------- BACKEND HOOK-UP ---------------- */
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000'
async function sendOrder(order) {
  const res = await fetch(`${API_URL}/api/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(order),
  })
  if (!res.ok) throw new Error('Order failed')
  return res.json()
}

/* ---------------- SMALL HOOKS ---------------- */
function useOpenStatus() {
  const [open, setOpen] = useState(isShopOpen)
  useEffect(() => {
    const t = setInterval(() => setOpen(isShopOpen()), 60000)
    return () => clearInterval(t)
  }, [])
  return open
}

// Fades elements in (.reveal / .reveal-scale) once they scroll into view
function useReveal(deps) {
  const observerRef = useRef(null)
  useEffect(() => {
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((en) => {
            if (en.isIntersecting) {
              en.target.classList.add('visible')
              observerRef.current.unobserve(en.target)
            }
          })
        },
        { threshold: 0.12 }
      )
    }
    document
      .querySelectorAll('.reveal:not(.visible), .reveal-scale:not(.visible)')
      .forEach((el) => observerRef.current.observe(el))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
  useEffect(() => () => observerRef.current && observerRef.current.disconnect(), [])
}

// Ripple effect on buttons / chips (pure DOM effect, no state)
function useRipple() {
  useEffect(() => {
    const onClick = (e) => {
      const el = e.target.closest(
        '.btn, .category-chip, .size-pill, .cart-btn, .fab-top, .drawer__item-actions button'
      )
      if (!el) return
      const target = el.classList.contains('cart-btn') ? el.querySelector('.cart-btn__ripple-zone') : el
      if (!target) return
      const rect = target.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height)
      const span = document.createElement('span')
      span.className = 'ripple'
      span.style.width = span.style.height = size + 'px'
      span.style.left = e.clientX - rect.left - size / 2 + 'px'
      span.style.top = e.clientY - rect.top - size / 2 + 'px'
      target.appendChild(span)
      setTimeout(() => span.remove(), 650)
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])
}

/* ---------------- ICONS ---------------- */
function Icon({ name, className = '' }) {
  return (
    <svg className={`i ${className}`.trim()}>
      <use href={`#i-${name}`} />
    </svg>
  )
}

function Sprite() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }} aria-hidden="true">
      <symbol id="i-home" viewBox="0 0 24 24"><path d="M3 11l9-8 9 8"/><path d="M5 10v10h5v-6h4v6h5V10"/></symbol>
      <symbol id="i-menu" viewBox="0 0 24 24"><path d="M7 3v8M4 3v5a3 3 0 0 0 6 0V3M7 11v10"/><path d="M17 21V3c-2.5 1.5-4 4.5-4 8h4"/></symbol>
      <symbol id="i-phone" viewBox="0 0 24 24"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/></symbol>
      <symbol id="i-facebook" viewBox="0 0 24 24"><rect width="24" height="24" rx="6" fill="#1877F2" stroke="none"/><path fill="#fff" stroke="none" d="M16.7 24v-8.6h2.9l.5-3.4h-3.4V9.8c0-1 .3-1.7 1.7-1.7h1.8V5.1c-.3 0-1.4-.1-2.6-.1-2.6 0-4.3 1.6-4.3 4.4V12H10.4v3.4h2.9V24z"/></symbol>
      <symbol id="i-whatsapp" viewBox="0 0 24 24"><path fill="currentColor" stroke="none" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></symbol>
      <symbol id="i-pin" viewBox="0 0 24 24"><path d="M12 22s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/></symbol>
      <symbol id="i-cart" viewBox="0 0 24 24"><circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M2 3h3l2.6 12.4a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.5L21 8H6"/></symbol>
      <symbol id="i-close" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></symbol>
      <symbol id="i-trash" viewBox="0 0 24 24"><path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14M10 10v6M14 10v6"/></symbol>
      <symbol id="i-user" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></symbol>
      <symbol id="i-mobile" viewBox="0 0 24 24"><rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/></symbol>
      <symbol id="i-note" viewBox="0 0 24 24"><path d="M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8z"/><path d="M14 3v5h5M9 13h6M9 17h6"/></symbol>
      <symbol id="i-bike" viewBox="0 0 24 24"><circle cx="5.5" cy="17" r="3.5"/><circle cx="18.5" cy="17" r="3.5"/><path d="M5.5 17l4-8h6l3 8M9.5 9L8 6H6M15 9l-3.5 8"/></symbol>
      <symbol id="i-leaf" viewBox="0 0 24 24"><path d="M5 19C5 9 11 4 20 4c0 9-5 15-15 15z"/><path d="M5 19c3-5 6-8 10-10"/></symbol>
      <symbol id="i-star" viewBox="0 0 24 24"><path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/></symbol>
      <symbol id="i-bolt" viewBox="0 0 24 24"><path d="M13 2L4 14h7l-1 8 9-12h-7z"/></symbol>
      <symbol id="i-fire" viewBox="0 0 24 24"><path d="M12 22c4 0 7-2.8 7-6.8 0-3-1.8-5-3-6.2-.3 1.6-1.2 2.6-2.2 3 .5-3.6-.9-7.2-4.3-10-.3 3-1.6 5-3 6.6C5.4 10 5 12 5 15c0 4 3 7 7 7z"/></symbol>
      <symbol id="i-clock" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></symbol>
      <symbol id="i-pizza" viewBox="0 0 24 24"><path d="M12 22L3 5c5.5-3 12.5-3 18 0z"/><circle cx="10" cy="8.5" r="1"/><circle cx="14" cy="11" r="1"/><circle cx="11.5" cy="14" r="1"/></symbol>
      <symbol id="i-heart" viewBox="0 0 24 24"><path d="M12 21s-8-5.3-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 5.7-8 11-8 11z"/></symbol>
      <symbol id="i-check" viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></symbol>
    </svg>
  )
}

/* ---------------- LAYOUT PIECES ---------------- */
function Ticker() {
  return (
    <div className="ticker">
      <div className="ticker__track">
        <span><Icon name="fire" /> ৫০০৳+ অর্ডারে ফ্রি ডেলিভারি (Chawkbazar)</span>
        <span><Icon name="pizza" /> নতুন: Mr. Doughe Special Pizza — এখনই ট্রাই করুন</span>
        <span><Icon name="clock" /> প্রতিদিন বিকাল ৪টা থেকে রাত ৪টা পর্যন্ত খোলা</span>
        <span><Icon name="whatsapp" className="wa" /> সরাসরি WhatsApp এ অর্ডার করতে কল বা মেসেজ করুন</span>
      </div>
    </div>
  )
}

function ScrollProgress() {
  const [pct, setPct] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement
      const p = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100
      setPct(isFinite(p) ? p : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return <div className="scroll-progress" style={{ width: pct + '%' }} />
}

function BackToTop() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <button
      className={`fab-top ${show ? 'show' : ''}`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      title="উপরে যান"
    >
      ↑
    </button>
  )
}

function Navbar({ navOpen, setNavOpen, goPage, cartCount, cartPulse, openDrawer }) {
  const [scrolled, setScrolled] = useState(false)
  const open = useOpenStatus()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (e, page) => {
    e.preventDefault()
    goPage(page)
  }

  return (
    <>
      <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
        <div className="navbar__inner">
          <a className="navbar__brand" href="#" onClick={(e) => go(e, 'home')}>
            <img src="/logo.jpg" alt="Mr. Dough" />
            <span>Mr. Dough</span>
            <span className="status-badge">
              <span className={`status-dot ${open ? '' : 'closed'}`} />
              <span>{open ? 'খোলা এখন' : 'বন্ধ আছে'}</span>
            </span>
          </a>

          <nav className={`navbar__links ${navOpen ? 'open' : ''}`}>
            <div className="nav-header">
              <span>মেন্যু</span>
              <button className="nav-close" onClick={() => setNavOpen(false)}>
                <Icon name="close" />
              </button>
            </div>
            <div className="nav-links-group">
              <a href="#" onClick={(e) => go(e, 'home')}>
                <span className="icon-badge"><Icon name="home" /></span> Home
              </a>
              <a href="#" onClick={(e) => go(e, 'menu')}>
                <span className="icon-badge"><Icon name="menu" /></span> Menu
              </a>
              <a href={TEL_LINK}>
                <span className="icon-badge"><Icon name="phone" /></span> Call
              </a>
              <a href={FACEBOOK_LINK} target="_blank" rel="noreferrer">
                <span className="icon-badge"><Icon name="facebook" className="brand" /></span> Facebook
              </a>
            </div>
            <div className="nav-footer">
              <p><Icon name="pin" /><span>{ADDRESS}</span></p>
              <p><Icon name="phone" /><span>{PHONE_LABEL}</span></p>
              <div className="nav-social">
                <a href={FACEBOOK_LINK} target="_blank" rel="noreferrer" aria-label="Facebook">
                  <Icon name="facebook" className="brand" />
                </a>
                <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" aria-label="WhatsApp">
                  <Icon name="whatsapp" className="wa" />
                </a>
                <a href={TEL_LINK} aria-label="Call"><Icon name="phone" /></a>
              </div>
            </div>
          </nav>

          <div className="navbar__actions">
            <button className={`cart-btn ${cartPulse ? 'pulse' : ''}`} onClick={openDrawer}>
              <span className="cart-btn__ripple-zone"><Icon name="cart" /></span>
              {cartCount > 0 && <span className="cart-btn__badge">{cartCount}</span>}
            </button>
            <button className={`hamburger ${navOpen ? 'active' : ''}`} onClick={() => setNavOpen((v) => !v)}>
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>
      <div className={`nav-backdrop ${navOpen ? 'open' : ''}`} onClick={() => setNavOpen(false)} />
    </>
  )
}

function Drawer({ open, onClose, cart, subtotal, changeQty, removeItem, onCheckout }) {
  return (
    <>
      <div className={`drawer-backdrop ${open ? 'open' : ''}`} onClick={onClose} />
      <aside className={`drawer ${open ? 'open' : ''}`}>
        <div className="drawer__head">
          <h3>আপনার অর্ডার</h3>
          <button className="drawer__close" onClick={onClose}><Icon name="close" /></button>
        </div>
        <div className="drawer__list">
          {cart.length === 0 ? (
            <p className="drawer__empty">কার্ট খালি — মেন্যু থেকে কিছু যোগ করুন</p>
          ) : (
            cart.map((l) => (
              <div className="drawer__item" key={l.lineKey}>
                <div className="drawer__item-info">
                  <strong>{l.name}</strong>
                  {l.size && <span className="badge">{(sizeLabel[l.size] || l.size).toUpperCase()}</span>}
                  <span>{fmt(l.price)} × {l.qty}</span>
                </div>
                <div className="drawer__item-actions">
                  <button onClick={() => changeQty(l.lineKey, -1)}>−</button>
                  <span>{l.qty}</span>
                  <button onClick={() => changeQty(l.lineKey, 1)}>+</button>
                  <button className="drawer__remove" onClick={() => removeItem(l.lineKey)}>
                    <Icon name="trash" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="drawer__footer">
          <div className="drawer__subtotal"><span>সাবটোটাল</span><span>{fmt(subtotal)}</span></div>
          <button className="btn btn--full" onClick={onCheckout}>চেকআউট করুন</button>
        </div>
      </aside>
    </>
  )
}

function Toasts({ toasts }) {
  return (
    <div className="toast-wrap">
      {toasts.map((t) => (
        <div className="toast" key={t.id}>
          <Icon name={t.icon} />
          <span>{t.msg}</span>
        </div>
      ))}
    </div>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <img src="/logo.jpg" alt="Mr. Dough" />
          <p>Fresh · Tasty · Always</p>
        </div>
        <div className="footer__col">
          <h5>Contact</h5>
          <p><Icon name="pin" />{ADDRESS}</p>
          <p><Icon name="phone" /><a href={TEL_LINK}>{PHONE_LABEL}</a></p>
          <p><Icon name="whatsapp" className="wa" /><a href={WHATSAPP_LINK} target="_blank" rel="noreferrer">WhatsApp</a></p>
        </div>
        <div className="footer__col">
          <h5>Follow</h5>
          <a href={FACEBOOK_LINK} target="_blank" rel="noreferrer">
            <Icon name="facebook" className="brand" /> Facebook Page
          </a>
        </div>
      </div>
      <p className="footer__copy">© 2026 Mr. Dough. All rights reserved. Website Designed &amp; Developed by Web Partner BD</p>
    </footer>
  )
}

/* ---------------- PAGES ---------------- */
function FavButton({ active, onClick }) {
  return (
    <button className={`fav-btn ${active ? 'active' : ''}`} onClick={onClick}>
      {active ? '♥' : '♡'}
    </button>
  )
}

function HomePage({ goPage, selectCategory, favorites, toggleFav, singleOrder }) {
  return (
    <main>
      <section className="hero">
        <div className="hero__inner">
          <div className="hero__text">
            <p className="hero__eyebrow">Fresh · Tasty · Always</p>
            <h1>The Perfect <span className="hero__accent">Pizza</span> Moment!</h1>
            <p className="hero__sub">
              Chittagong-এর craving companion। Stone-baked pizza থেকে crispy chicken — সব পাবেন এক জায়গায়, ঘরে বসেই।
            </p>
            <div className="hero__cta">
              <a
                className="btn btn--order btn--large"
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  pressThen(e, () => goPage('menu'))
                }}
              >
                এখনই অর্ডার করুন
              </a>
              <a className="btn btn--ghost btn--large" href={TEL_LINK} style={{ borderColor: '#fff', color: '#fff' }}>
                কল করুন
              </a>
              <a className="btn btn--whatsapp btn--large" href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 32 32"><path d="M16.004 3C9.377 3 4 8.373 4 15c0 2.31.654 4.47 1.786 6.3L4 29l7.9-1.744A11.93 11.93 0 0 0 16.004 27C22.63 27 28 21.627 28 15S22.63 3 16.004 3zm6.98 16.98c-.29.82-1.44 1.5-2.36 1.7-.63.13-1.45.24-4.2-.9-3.53-1.46-5.8-5.03-5.98-5.27-.17-.24-1.43-1.9-1.43-3.63 0-1.72.9-2.57 1.22-2.92.32-.35.7-.44.93-.44.23 0 .47 0 .67.01.22.01.5-.08.78.6.29.7.98 2.42 1.06 2.6.09.17.15.38.03.61-.12.24-.18.38-.36.58-.18.2-.38.45-.54.6-.18.17-.37.36-.16.71.21.35.94 1.55 2.02 2.51 1.39 1.24 2.56 1.62 2.92 1.8.36.18.57.15.78-.09.21-.24.9-1.05 1.14-1.41.24-.35.48-.29.8-.17.32.12 2.05.97 2.4 1.14.36.18.6.26.68.41.09.15.09.85-.2 1.67z" /></svg>
                WhatsApp
              </a>
            </div>
            <div className="hero__badges">
              <span><Icon name="bike" /> দ্রুত ডেলিভারি</span>
              <span><Icon name="leaf" /> তাজা উপকরণ</span>
              <span><Icon name="star" /> সেরা স্বাদ</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <h2 className="reveal">আমাদের ক্যাটাগরি</h2>
        <div className="categories-grid">
          {categories.map((c, i) => (
            <div
              key={c.id}
              className="category-card reveal-scale"
              style={{ transitionDelay: `${Math.min(i * 0.05, 0.4)}s` }}
              onClick={() => {
                goPage('menu')
                selectCategory(c.id)
              }}
            >
              <div className="category-card__image">
                <div className="plate"><span className="emoji">{c.icon}</span></div>
              </div>
              <div className="category-card__label"><p>{c.name}</p></div>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2 className="reveal">জনপ্রিয় আইটেম</h2>
        <div className="bestsellers-grid">
          {bestSellerIds.map((id, i) => {
            const item = menuItems.find((m) => m.id === id)
            if (!item) return null
            const price = item.sizes ? Object.values(item.sizes)[0] : item.price
            return (
              <div className="bestseller-card reveal" key={id} style={{ transitionDelay: `${i * 0.08}s` }}>
                <div className="bestseller-card__image">
                  <div className="plate"><span className="emoji">{categoryIcon(item.category)}</span></div>
                  <FavButton active={favorites.has(item.id)} onClick={(e) => toggleFav(item.id, e)} />
                </div>
                <div className="bestseller-card__body">
                  <h4>{item.name}</h4>
                  <p>{item.desc}</p>
                  <div className="bestseller-card__footer">
                    <span className="price">{fmt(price)}+</span>
                    <button className="btn btn--order" onClick={(e) => singleOrder(item.id, e)}>অর্ডার করুন</button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        <div className="center">
          <a className="btn" href="#" onClick={(e) => { e.preventDefault(); goPage('menu') }}>সম্পূর্ণ মেন্যু দেখুন</a>
        </div>
      </section>

      <section className="offer-banner">
        <div className="reveal-scale">
          <h3>Combo Deals — Save Up to 30%</h3>
          <p>More Food, More Happiness</p>
          <a className="btn btn--light" href="#" onClick={(e) => { e.preventDefault(); goPage('menu') }}>এখনই দেখুন</a>
        </div>
      </section>
    </main>
  )
}

function MenuPage({
  activeCategory, selectCategory, search, setSearch, items,
  selectedSizes, selectSize, favorites, toggleFav, handleAdd, addedId, singleOrder,
}) {
  return (
    <main className="menu-page">
      <h1>আমাদের মেন্যু</h1>
      <input
        className="menu-search"
        placeholder="আইটেম খুঁজুন..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="category-strip">
        {categories.map((c) => (
          <button
            key={c.id}
            className={`category-chip ${c.id === activeCategory ? 'active' : ''}`}
            onClick={() => selectCategory(c.id)}
          >
            <span>{c.icon}</span>{c.name}
          </button>
        ))}
      </div>
      <div className="item-grid">
        {items.length === 0 && <p className="menu-empty">কোনো আইটেম পাওয়া যায়নি</p>}
        {items.map((item, i) => {
          const sizeKeys = item.sizes ? Object.keys(item.sizes) : null
          const size = defaultSize(item, selectedSizes)
          const price = priceOf(item, size)
          const rating = (4.3 + (item.id.charCodeAt(0) % 6) * 0.1).toFixed(1)
          return (
            <div className="item-card reveal" key={item.id} style={{ transitionDelay: `${Math.min(i * 0.05, 0.5)}s` }}>
              <div className="item-card__image">
                {SPECIAL_IDS.includes(item.id) && (
                  <span className="special-ribbon"><Icon name="fire" /> Today's Special</span>
                )}
                <div className="plate"><span className="emoji">{categoryIcon(item.category)}</span></div>
                <FavButton active={favorites.has(item.id)} onClick={(e) => toggleFav(item.id, e)} />
              </div>
              <div className="item-card__body">
                <h4>{item.name}</h4>
                <div className="stars">
                  <span className="star">★</span><span className="star">★</span><span className="star">★</span>
                  <span className="star">★</span><span className="star">☆</span>
                  <span className="num">{rating}</span>
                </div>
                <p>{item.desc}</p>
                {sizeKeys && (
                  <div className="item-card__sizes">
                    {sizeKeys.map((k) => (
                      <button
                        key={k}
                        className={`size-pill ${k === size ? 'active' : ''}`}
                        onClick={() => selectSize(item.id, k)}
                      >
                        {sizeLabel[k] || k}
                      </button>
                    ))}
                  </div>
                )}
                <div className="item-card__footer">
                  <span className="item-card__price">{fmt(price)}</span>
                </div>
                <div className="item-card__actions">
                  <button
                    className={`btn btn--small add-btn ${addedId === item.id ? 'added' : ''}`}
                    onClick={() => handleAdd(item.id)}
                  >
                    {addedId === item.id ? 'যোগ হয়েছে ✓' : 'কার্টে যোগ করুন'}
                  </button>
                  <button className="btn btn--order btn--small" onClick={(e) => singleOrder(item.id, e)}>
                    <Icon name="bolt" /> এখনই অর্ডার করুন
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </main>
  )
}

function CheckoutPage({ cart, form, setForm, zone, total, submitting, onSubmit, goPage }) {
  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))
  return (
    <main className="checkout-page">
      <h1>চেকআউট</h1>
      {cart.length === 0 ? (
        <div style={{ textAlign: 'center' }}>
          <p>
            আপনার কার্ট খালি।{' '}
            <a href="#" onClick={(e) => { e.preventDefault(); goPage('menu') }} style={{ color: 'var(--blue)', fontWeight: 600 }}>
              মেন্যু থেকে অর্ডার করুন
            </a>
          </p>
        </div>
      ) : (
        <div className="checkout-grid">
          <form className="checkout-form" onSubmit={onSubmit}>
            <label>
              <Icon name="user" /> নাম
              <input required placeholder="আপনার নাম" value={form.name} onChange={update('name')} />
            </label>
            <label>
              <Icon name="mobile" /> মোবাইল নম্বর
              <input required type="tel" placeholder="01XXXXXXXXX" value={form.phone} onChange={update('phone')} />
            </label>
            <label>
              <Icon name="pin" /> ঠিকানা
              <textarea required placeholder="বাসা/রোড/এলাকা" value={form.address} onChange={update('address')} />
            </label>
            <label>
              <Icon name="bike" /> ডেলিভারি এলাকা
              <select value={form.zoneId} onChange={update('zoneId')}>
                {deliveryZones.map((z) => (
                  <option key={z.id} value={z.id}>
                    {z.name} {z.charge > 0 ? `(+৳${z.charge})` : '(ফ্রি)'}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <Icon name="note" /> নোট (ঐচ্ছিক)
              <textarea placeholder="বিশেষ কোনো নির্দেশনা?" value={form.note} onChange={update('note')} />
            </label>
            <button type="submit" className="btn btn--full btn--large" disabled={submitting}>
              {submitting ? 'অর্ডার হচ্ছে...' : `অর্ডার কনফার্ম করুন — ${fmt(total)}`}
            </button>
          </form>

          <div className="checkout-summary">
            <h3>অর্ডার সামারি</h3>
            <div>
              {cart.map((l) => (
                <div className="summary-line" key={l.lineKey}>
                  <span>
                    {l.name} {l.size ? `(${sizeLabel[l.size] || l.size})` : ''} × {l.qty}
                  </span>
                  <span>{fmt(l.price * l.qty)}</span>
                </div>
              ))}
              <div className="summary-line">
                <span>ডেলিভারি চার্জ ({zone.name})</span>
                <span>{fmt(zone.charge)}</span>
              </div>
              <div className="summary-line summary-line--total">
                <span>মোট</span>
                <span>{fmt(total)}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

function ConfirmedPage({ confirmed, goPage }) {
  return (
    <main className="confirmed-page">
      <div className="confirmed-card">
        <svg className="check-circle" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="46" />
          <path d="M28 52 L44 68 L74 34" />
        </svg>
        <h1>অর্ডার সফল হয়েছে!</h1>
        <p>{confirmed.name ? `ধন্যবাদ, ${confirmed.name}!` : ''}</p>
        <p>{`মোট বিল: ${fmt(confirmed.total)}`}</p>
        <p className="confirmed-note">
          আমাদের টিম শীঘ্রই আপনার সাথে যোগাযোগ করবে। এই মুহূর্তে অর্ডার ম্যানুয়ালি প্রসেস হচ্ছে — ব্যাকএন্ড চালু হলে এটি সরাসরি ড্যাশবোর্ড ও Telegram-এ চলে যাবে।
        </p>
        <a className="btn" href="#" onClick={(e) => { e.preventDefault(); goPage('menu') }}>আবার অর্ডার করুন</a>
      </div>
    </main>
  )
}

/* ---------------- APP ---------------- */
export default function App() {
  const [page, setPage] = useState('home') // home | menu | checkout | confirmed
  const [cart, setCart] = useState([]) // {lineKey,id,name,price,size,qty}
  const [activeCategory, setActiveCategory] = useState(categories[0].id)
  const [selectedSizes, setSelectedSizes] = useState({}) // itemId -> size key
  const [favorites, setFavorites] = useState(() => new Set())
  const [search, setSearch] = useState('')
  const [navOpen, setNavOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [toasts, setToasts] = useState([])
  const [cartPulse, setCartPulse] = useState(false)
  const [addedId, setAddedId] = useState(null)
  const [flash, setFlash] = useState(false)
  const [confetti, setConfetti] = useState([])
  const [submitting, setSubmitting] = useState(false)
  const [confirmed, setConfirmed] = useState({ name: '', total: 0 })
  const [form, setForm] = useState({
    name: '', phone: '', address: '', zoneId: deliveryZones[0].id, note: '',
  })

  const toastId = useRef(0)
  const pulseTimer = useRef(null)

  useRipple()
  useReveal([page, activeCategory, search])

  /* derived values */
  const cartCount = cart.reduce((s, l) => s + l.qty, 0)
  const subtotal = cart.reduce((s, l) => s + l.price * l.qty, 0)
  const zone = deliveryZones.find((z) => z.id === form.zoneId) || deliveryZones[0]
  const total = subtotal + zone.charge

  const visibleItems = useMemo(() => {
    const q = search.toLowerCase().trim()
    let list = menuItems.filter((m) => m.category === activeCategory)
    if (q) list = list.filter((m) => m.name.toLowerCase().includes(q))
    return list
  }, [activeCategory, search])

  /* helpers */
  const showToast = useCallback((msg, icon = 'check') => {
    const id = ++toastId.current
    setToasts((t) => [...t, { id, msg, icon }])
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 2500)
  }, [])

  const goPage = useCallback((name) => {
    setPage(name)
    setNavOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const triggerFlash = () => {
    setFlash(true)
    setTimeout(() => setFlash(false), 560)
  }

  const fireConfetti = () => {
    const stamp = Date.now()
    const pieces = Array.from({ length: 60 }, (_, i) => ({
      id: `${stamp}-${i}`,
      style: {
        left: Math.random() * 100 + 'vw',
        background: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
        animationDuration: 2.2 + Math.random() * 1.6 + 's',
        opacity: 0.7 + Math.random() * 0.3,
        borderRadius: Math.random() > 0.5 ? '50%' : '2px',
      },
    }))
    setConfetti((c) => [...c, ...pieces])
    setTimeout(() => setConfetti((c) => c.filter((p) => !pieces.includes(p))), 4000)
  }

  const pulseCart = () => {
    setCartPulse(true)
    clearTimeout(pulseTimer.current)
    pulseTimer.current = setTimeout(() => setCartPulse(false), 400)
  }

  /* wishlist */
  const toggleFav = (itemId, e) => {
    e.stopPropagation()
    const adding = !favorites.has(itemId)
    setFavorites((prev) => {
      const next = new Set(prev)
      if (next.has(itemId)) next.delete(itemId)
      else next.add(itemId)
      return next
    })
    if (adding) showToast('পছন্দের তালিকায় যোগ হয়েছে', 'heart')
  }

  /* menu */
  const selectCategory = (id) => setActiveCategory(id)
  const selectSize = (itemId, size) => setSelectedSizes((s) => ({ ...s, [itemId]: size }))

  /* cart */
  const addToCart = (itemId) => {
    const item = menuItems.find((m) => m.id === itemId)
    const size = defaultSize(item, selectedSizes)
    const price = priceOf(item, size)
    const lineKey = lineKeyOf(item, size)
    setCart((prev) => {
      if (prev.some((l) => l.lineKey === lineKey)) {
        return prev.map((l) => (l.lineKey === lineKey ? { ...l, qty: l.qty + 1 } : l))
      }
      return [...prev, { lineKey, id: item.id, name: item.name, price, size, qty: 1 }]
    })
    pulseCart()
  }

  const handleAdd = (itemId) => {
    addToCart(itemId)
    const item = menuItems.find((m) => m.id === itemId)
    showToast(`${item.name} কার্টে যোগ হয়েছে`, 'cart')
    setAddedId(itemId)
    setTimeout(() => setAddedId((cur) => (cur === itemId ? null : cur)), 700)
  }

  const changeQty = (lineKey, delta) => {
    setCart((prev) =>
      prev
        .map((l) => (l.lineKey === lineKey ? { ...l, qty: l.qty + delta } : l))
        .filter((l) => l.qty > 0)
    )
  }
  const removeItem = (lineKey) => setCart((prev) => prev.filter((l) => l.lineKey !== lineKey))

  const doSingleOrder = (itemId) => {
    const item = menuItems.find((m) => m.id === itemId)
    const size = defaultSize(item, selectedSizes)
    setCart([{ lineKey: lineKeyOf(item, size), id: item.id, name: item.name, price: priceOf(item, size), size, qty: 1 }])
    showToast(`${item.name} নিয়ে চেকআউটে যাচ্ছেন`, 'bolt')
    goPage('checkout')
  }
  const singleOrder = (itemId, e) => pressThen(e, () => doSingleOrder(itemId))

  const goCheckoutFromDrawer = () => {
    if (cart.length === 0) return
    setDrawerOpen(false)
    goPage('checkout')
  }

  /* checkout */
  const submitOrder = async (e) => {
    e.preventDefault()
    if (cart.length === 0 || submitting) return
    const order = {
      customer: { name: form.name, phone: form.phone, address: form.address, note: form.note },
      items: cart,
      zone,
      deliveryCharge: zone.charge,
      subtotal,
      total,
    }
    setSubmitting(true)
    try {
      await sendOrder(order)
      setConfirmed({ name: form.name, total })
      triggerFlash()
      setCart([])
      goPage('confirmed')
      fireConfetti()
    } catch (err) {
      showToast('অর্ডার পাঠানো যায়নি, আবার চেষ্টা করুন', 'close')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <Sprite />
      <div className={`flash-overlay ${flash ? 'flash' : ''}`} />
      <ScrollProgress />
      <Ticker />

      <Navbar
        navOpen={navOpen}
        setNavOpen={setNavOpen}
        goPage={goPage}
        cartCount={cartCount}
        cartPulse={cartPulse}
        openDrawer={() => setDrawerOpen(true)}
      />

      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        cart={cart}
        subtotal={subtotal}
        changeQty={changeQty}
        removeItem={removeItem}
        onCheckout={goCheckoutFromDrawer}
      />

      <div className={`page ${page === 'home' ? 'active' : ''}`} id="page-home">
        <HomePage
          goPage={goPage}
          selectCategory={selectCategory}
          favorites={favorites}
          toggleFav={toggleFav}
          singleOrder={singleOrder}
        />
      </div>

      <div className={`page ${page === 'menu' ? 'active' : ''}`} id="page-menu">
        <MenuPage
          activeCategory={activeCategory}
          selectCategory={selectCategory}
          search={search}
          setSearch={setSearch}
          items={visibleItems}
          selectedSizes={selectedSizes}
          selectSize={selectSize}
          favorites={favorites}
          toggleFav={toggleFav}
          handleAdd={handleAdd}
          addedId={addedId}
          singleOrder={singleOrder}
        />
      </div>

      <div className={`page ${page === 'checkout' ? 'active' : ''}`} id="page-checkout">
        <CheckoutPage
          cart={cart}
          form={form}
          setForm={setForm}
          zone={zone}
          total={total}
          submitting={submitting}
          onSubmit={submitOrder}
          goPage={goPage}
        />
      </div>

      <div className={`page ${page === 'confirmed' ? 'active' : ''}`} id="page-confirmed">
        <ConfirmedPage confirmed={confirmed} goPage={goPage} />
      </div>

      <Footer />
      <Toasts toasts={toasts} />
      <BackToTop />

      {confetti.map((p) => (
        <div key={p.id} className="confetti-piece" style={p.style} />
      ))}
    </>
  )
}
